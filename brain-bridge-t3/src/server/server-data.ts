import {
  type MessageWithRelations,
  type ConversationWithRelations,
  type TrainingSetWithRelations,
  type TrainingIndexWithRelations, trainingSetWithRelations,
  type PublicChatWithRelations,
  messageWithRelations,
  type PublicChatInstanceWithRelations,
  conversationWithRelations
} from "~/server/interfaces/types";
import { getServerSession } from "./auth";
import invariant from "tiny-invariant";
import { notFound } from "next/navigation";
import { prisma } from "./db";
import { type Participant } from "@prisma/client";
import Mail from "~/lib/mail";

///////////////////
// Training Sets //
async function fetchUserTrainingSets(): Promise<TrainingSetWithRelations[]> {
  const user = await getServerSession();
  invariant(user, "User must be logged in to fetch training sets");
  console.log("fetchUserTrainingSets", user.user.id)
  const sets = await prisma.trainingSet.findMany({
    where: { OR: [{ userId: user.user.id }, { trainingSetShares: { some: { acceptedUserId: user.user.id } } }] },
    ...trainingSetWithRelations
  });
  return sets;
}

async function fetchTrainingSet(trainingSetId: string) {
  const set = await prisma.trainingSet.findFirst({
    where: { id: trainingSetId },
    ...trainingSetWithRelations
  });
  return set;
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
      missedQuestions: true,
      trainingSetShares: true
    }
  });
  console.log("UTS")
  if (set) return set;
  console.log("UTS2", user.user.id, trainingSetId)
  const share = await prisma.trainingSetShares.findFirst({
    where: {
      trainingSetId: trainingSetId,
      acceptedUserId: user.user.id,
    }
  });
  console.log("share", share)
  if (share) {
    const set = await prisma.trainingSet.findFirst({
      where: { id: trainingSetId, trainingSetShares: { some: { acceptedUserId: user.user.id } } },
      include: {
        trainingSources: true,
        questionsAndAnswers: true,
        conversations: true,
        missedQuestions: true,
        trainingSetShares: true
      }
    });
    return set;
  }

}

async function acceptInvitation(trainingSetId: string) {
  const user = await getServerSession();
  invariant(user, "User must be logged in to accept invitation");
  invariant(user.user.email, "User must have an email to accept invitation")
  const trainingSet = await fetchTrainingSet(trainingSetId);
  invariant(trainingSet, "Training set must exist to accept invitation");
  const userTrainingShare = await prisma.trainingSetShares.findFirst({
    where: {
      trainingSetId: trainingSetId,
      toUserEmail: user.user.email,
    }
  });
  if (userTrainingShare) {
    const result = await prisma.trainingSetShares.update({
      where: {
        id: userTrainingShare.id,
      },
      data: {
        acceptedAt: new Date(),
        acceptedUser: {
          connect: {
            id: user.user.id,
          }
        }
      }
    });
    return result;
  } else {
    throw new Error("Could not find invitation to accept")
  }
}

async function sendTrainingSetInvitationEmail(email: string, trainingSetName: string, trainingSetId: string) {
  const user = await getServerSession();
  invariant(user, "User must be logged in to send invitation emails");
  const trainingSet = await fetchUserTrainingSet(trainingSetId);
  invariant(trainingSet, "Training set must exist to send invitation emails");
  const loadedUser = await prisma.user.findUnique({
    where: {
      id: trainingSet.userId,
    }
  });
  invariant(loadedUser, "User must exist to send invitation emails");
  invariant(loadedUser.email, "User must have an email to send invitation emails");
  const result = await Mail.sendTrainingSetInvitation(`${loadedUser.email}`, email, {
    invite_sender_name: loadedUser.name ?? loadedUser.email ?? "Someone",
    training_set_name: trainingSetName,
    training_set_id: trainingSetId,
  });

  console.log("Sending email", email, loadedUser.email)
  return result;
}

async function sendInvitationEmails(trainingSet: TrainingSetWithRelations) {
  const invitationsToSend = trainingSet.trainingSetShares.filter(s => {
    return s.invitationSentAt === null && s.acceptedAt === null;
  });
  console.log("Will need to send invitations", invitationsToSend)
  const results = await Promise.all(invitationsToSend.map(async s => {
    console.log("Sending invitation email", s.toUserEmail, trainingSet.id)
    const emailResult = await sendTrainingSetInvitationEmail(s.toUserEmail, trainingSet.name, trainingSet.id);
    return {
      share: s, emailResult
    }
  }));
  await Promise.all(results.map(async (r) => {
    if (r.emailResult.ErrorCode === 0) {
      return await prisma.trainingSetShares.update({
        where: {
          id: r.share.id,
        },
        data: {
          invitationSentAt: new Date(),
        }
      });
    }
  }))
}

async function updateUserTrainingSet(trainingSet: TrainingSetWithRelations) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to update training sets");
  const existing = await fetchUserTrainingSet(trainingSet.id);
  invariant(existing, "Training set must exist to update");
  const authorizedToUpdate = (
    existing.userId === session.user.id ||
    (
      existing.trainingSetShares.some(s => s.acceptedUserId === session.user.id)
      && existing.trainingSetShares.find(s => s.acceptedUserId === session.user.id)?.role === "EDITOR"
    )
  );
  invariant(authorizedToUpdate, "User is not authorized to make this update");
  await prisma.trainingSet.update({
    where: {
      id: trainingSet.id,
    },
    data: {
      name: trainingSet.name,
      prompt: trainingSet.prompt,
      useOwnPrompt: trainingSet.useOwnPrompt,
      questionsAndAnswers: {
        deleteMany: {},
        create: trainingSet.questionsAndAnswers.map(qa => {
          return {
            question: qa.question,
            answer: qa.answer,
            token: qa.token,
          }
        })
      },
      trainingSources: {
        deleteMany: {},
        create: trainingSet.trainingSources.map(s => {
          return {
            type: s.type,
            name: s.name,
            content: s.content,
            pending: false,
            mimeType: s.mimeType
          }
        }),
      },
      missedQuestions: {
        deleteMany: {},
        create: trainingSet.missedQuestions.map(qa => {
          return {
            question: qa.question,
            llmAnswer: qa.llmAnswer,
            correctAnswer: qa.correctAnswer,
            ignored: qa.ignored,
          }
        })
      },
      trainingSetShares: {
        deleteMany: {},
        create: trainingSet.trainingSetShares.map(s => {
          return {
            user: {
              connect: {
                id: session.user.id,
              }
            },
            // trainingSet: {
            //   connect: {
            //     id: trainingSet.id,
            //   }
            // },
            role: s.role,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt,
            toUserEmail: s.toUserEmail,
            acceptedByUser: s.acceptedByUser,
            acceptedUser: s.acceptedUserId ? {
              connect: {
                id: s.acceptedUserId
              }
            } : undefined,
            acceptedAt: s.acceptedAt,
          }
        }),
      },
      updatedAt: new Date(),
      version: existing.version + 1,
    },
  })
  const updated = await fetchUserTrainingSet(trainingSet.id);
  invariant(updated, "Training set must exist to update");
  await sendInvitationEmails(updated);
  return updated;
}

async function createTrainingSet(trainingSet: TrainingSetWithRelations) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to create training sets");
  const result = await prisma.trainingSet.create({
    data: {
      name: trainingSet.name,
      prompt: trainingSet.prompt,
      useOwnPrompt: trainingSet.useOwnPrompt,
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
    ...conversationWithRelations
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
          publicChatInstanceId: true,
          publicChatInstance: true,
        },
      },
      participants: true,
      trainingSet: {
        include: {
          questionsAndAnswers: true,
        }
      }
    }
  });
  if (!chat) { notFound(); }
  return chat;
}

async function deleteChat(id: string) {
  console.log("DELETING", id)
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

async function clearChat(id: string) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to delete messages from a chat");
  let conversation = await ServerData.fetchChat(id);
  invariant(conversation, "Conversation must exist");
  if (conversation.userId !== session.user.id) { throw new Error("User does not own this chat"); }
  await prisma.message.deleteMany({
    where: { conversationId: id },
  });
  conversation = await ServerData.fetchChat(id);
  return conversation;
}

async function clearPublicChat(id: string) {
  let conversation = await ServerData.fetchPublicChatInstance(id);
  invariant(conversation, "Public chat instance must exist");
  await prisma.message.deleteMany({
    where: { publicChatInstanceId: id },
  });
  conversation = await ServerData.fetchPublicChatInstance(id);
  return conversation;
}

async function fetchPublicChats() {
  const session = await getServerSession();
  invariant(session, "User must be logged in to fetch public chats");
  const chats = await prisma.publicChat.findMany({
    where: { userId: session.user.id },
    include: {
      trainingSet: true,
    }
  });
  return chats;
}

async function fetchPublicChat(id: string, publishedOnly: boolean) {
  const where = publishedOnly ? { id, published: true } : { id };
  const chat = await prisma.publicChat.findFirst({
    where,
    include: {
      trainingSet: true,
    }
  });
  return chat;
}


// TODO: Remove this published: boolean BS below. Was getting a TS error even though it 
// works and is on the model
async function updatePublicChat(publicChat: PublicChatWithRelations & { published: boolean }) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to create a public chat");
  console.log("UPDATING", publicChat)
  const chat = await prisma.publicChat.update({
    where: { id: publicChat.id },
    data: {
      name: publicChat.name,
      trainingSet: {
        connect: { id: publicChat.trainingSetId }
      },
      updatedAt: new Date(),
      published: publicChat.published,
    },
    select: {
      id: true,
      name: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      trainingSet: true,
    }
  });
  return chat;
}

async function deletePublicChat(id: string) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to delete a public chat");
  const chat = await fetchPublicChat(id, false);
  if (!chat) { notFound(); }
  if (chat.userId !== session.user.id) { throw new Error("User does not own this public chat"); }
  await prisma.publicChat.delete({
    where: { id },
  });
  return true;
}

async function newPublicChatInstance({ participant, publicChat }: { participant: Participant, publicChat: PublicChatWithRelations }) {
  const chat = await prisma.publicChatInstance.create({
    data: {
      participants: {
        connectOrCreate: [
          {
            where: {
              id: participant.id,
            },
            create: {
              id: participant.id,
              name: participant.name,
              type: participant.type,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          }
        ]
      },
      createdAt: new Date(),
      publicChat: {
        connect: { id: publicChat.id }
      },
      name: `${publicChat.id}-${publicChat.name}-${participant.name}`,
      updatedAt: new Date(),
    },
    include: {
      participants: true,
      publicChat: true,
      messages: {
        select: {
          createdAt: true,
          id: true,
          publicChatInstance: true,
          publicChatInstanceId: true,
          sender: true,
          text: true,
          conversationId: true,
          conversation: true,
          participantId: true,
        }
      },
    }
  });
  return chat;
}

async function fetchPublicChatInstanceForViewer(id: string, viewerId: string) {
  const chat = await prisma.publicChatInstance.findFirst({
    where: { publicChatId: id, participants: { some: { id: viewerId } } },
    include: {
      participants: true,
      publicChat: true,
      messages: messageWithRelations,
    }
  });
  invariant(chat, "Chat must exist");
  return chat;
}

async function fetchPublicChatInstance(id: string): Promise<PublicChatInstanceWithRelations> {
  const session = await getServerSession();
  invariant(session, "User must be logged in to fetch public chat instances");
  const chat = await prisma.publicChatInstance.findFirst({
    where: { id },
    include: {
      participants: true,
      publicChat: true,
      messages: messageWithRelations,
    }
  });
  invariant(chat, "Chat must exist");
  return chat;
}


//////////////
// Messages //
async function sendMessage(message: MessageWithRelations): Promise<MessageWithRelations> {
  const session = await getServerSession();
  invariant(session, "User must be logged in to send messages");
  invariant(message.conversationId, "Conversation ID must be provided");
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
      publicChatInstanceId: true,
      publicChatInstance: true,
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
  updateUserTrainingSet,
  /* Conversations */
  newChat,
  fetchChats,
  fetchChat,
  fetchPublicChat,
  deletePublicChat,
  fetchPublicChats,
  updatePublicChat,
  deleteChat,
  clearChat,
  clearPublicChat,
  sendMessage,
  newPublicChatInstance,
  fetchPublicChatInstance,
  fetchPublicChatInstanceForViewer,
  acceptInvitation
}

export default ServerData;