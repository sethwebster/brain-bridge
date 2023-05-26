import { type MessageWithRelations, type ConversationWithRelations, type TrainingSetWithRelations, type TrainingIndexWithRelations } from "~/interfaces/types";
import { getServerSession } from "./auth";
import invariant from "tiny-invariant";
import { notFound } from "next/navigation";
import { prisma } from "./db";

///////////////////
// Training Sets //
async function fetchUserTrainingSets() {
  const user = await getServerSession();
  invariant(user, "User must be logged in to fetch training sets");
  const sets = await prisma.trainingSet.findMany({
    where: { userId: user.user.id },
  });
  return sets;
}

async function fetchUserTrainingSet(trainingSetId: string) {
  const user = await getServerSession();
  invariant(user, "User must be logged in to fetch training sets");
  const set = await prisma.trainingSet.findFirst({
    where: { id: trainingSetId, userId: user.user.id },
    include: {
      trainingSources: true,
      questionsAndAnswers: true,
      conversations: true,
    }
  });
  return set;
}

async function createTrainingSet(trainingSet: TrainingSetWithRelations) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to create training sets");
  const result = await prisma.trainingSet.create({
    data: {
      name: trainingSet.name,
      prompt: trainingSet.prompt,
      conversations: {
        create: [],
      },
      questionsAndAnswers: {
        create: trainingSet.questionsAndAnswers,
      },
      trainingSources: {
        create: trainingSet.trainingSources,
      },
      user: {
        connect: { id: session.user.id },
      },
      version: 0,

    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      userId: true,
      version: true,
      prompt: true,
      trainingSources: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          type: true,
          name: true,
          content: true,
          trainingSetId: true,
        }
      },
      questionsAndAnswers: {
        select: {
          id: true,
          question: true,
          answer: true,
          token: true,
          trainingSetId: true,
        }
      },
      user: {
        select: {
          id: true,
          email: true,
        }
      }
    }
  })
  return result;
}

///////////////////
// Conversations //

async function newChat(trainingSetId: string) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to create a chat")

  const chat = await prisma.conversation.create({
    data: {
      createdAt: new Date(),
      participants: {
        create: [{
          type: "HUMAN",
          name: session.user.name ?? "Anonymous",
        }, {
          type: "BOT",
          name: "Bot",
        }],
      },
      user: {
        connect: {
          id: session.user.id
        }
      },
      trainingSet: {
        connect: {
          id: trainingSetId
        }
      }
    }
  })
  return fetchChat(chat.id);
}

async function fetchChats(): Promise<ConversationWithRelations[]> {
  const session = await getServerSession();
  invariant(session, "User must be logged in to fetch chats");
  const chats = await prisma.conversation.findMany({
    where: { userId: session.user.id },
    include: {
      messages: {
        select: {
          id: true,
          text: true,
          createdAt: true,
          sender: true,
          participantId: true,
          conversationId: true,
          conversation: true,
        },
      },
      participants: true,
      trainingSet: true,
    }
  });
  return chats;
}

async function fetchChat(id: string): Promise<ConversationWithRelations> {
  const session = await getServerSession();
  invariant(session, "User must be logged in to fetch chat");
  const chat = await prisma.conversation.findFirst({
    where: { id, userId: session.user.id },
    include: {
      messages: {
        select: {
          id: true,
          text: true,
          createdAt: true,
          sender: true,
          participantId: true,
          conversationId: true,
          conversation: true,
        },
      },
      participants: true,
      trainingSet: true,
    }
  });
  if (!chat) { notFound(); }
  return chat;
}

async function deleteChat(id: string) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to delete chat");
  const chat = await fetchChat(id);
  if (!chat) { notFound(); }
  if (chat.userId !== session.user.id) { throw new Error("User does not own this chat"); }
  await prisma.conversation.delete({
    where: { id },
  });
  return true;
}

//////////////
// Messages //
async function sendMessage(message: MessageWithRelations): Promise<MessageWithRelations> {
  const session = await getServerSession();
  invariant(session, "User must be logged in to send messages");
  const newMessage = await prisma.message.create({
    data: {
      conversation: {
        connect: { id: message.conversationId }
      },
      sender: {
        connect: { id: session.user.id }
      },
      text: message.text,
      createdAt: new Date(),
    },
    select: {
      id: true,
      text: true,
      createdAt: true,
      sender: true,
      conversation: true,
      participantId: true,
      conversationId: true,
    },
  });
  return newMessage;
}

async function createTrainingIndex(trainingIndex: TrainingIndexWithRelations) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to create training index");
  const trainingSet = await prisma.trainingSet.findFirst({
    where: { id: trainingIndex.trainingSetId, userId: session.user.id },
  });
  invariant(trainingSet, "User must own training set to create training index");
  const existing = await prisma.trainingIndex.findFirst({
    where: { trainingSetId: trainingSet.id },
  });
  if (existing) {
    await prisma.trainingIndex.delete({
      where: { id: existing.id },
    });
  }
  const created = await prisma.trainingIndex.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      trainingSetId: trainingSet.id,
      pending: false,
      docStore: trainingIndex.docStore,
      vectors: trainingIndex.vectors,
      metaData: trainingIndex.metaData as string,
    },
  });
  return created;
}

const ServerData = {
  /* Training Sets */
  createTrainingSet,
  fetchUserTrainingSets,
  fetchUserTrainingSet,
  createTrainingIndex,
  /* Conversations */
  newChat,
  fetchChats,
  fetchChat,
  deleteChat,
  sendMessage
}

export default ServerData;