import { Conversation, Message, Participant, PrismaClient, TrainingIndex } from "@prisma/client";
import { Socket } from "socket.io";
import invariant from "tiny-invariant";
import { createTrainingIndex } from "../lib/training";
import { verifyJWT } from "../lib/jwt";
import { JSONMap } from "njwt";
import { prisma } from "../lib/db";

export function messageRouter(socket: Socket) {
  socket.onAny((event, ...args) => {
    console.log("[received]", event, ...args)
  });

  socket.on("train", async (data) => {
    const { data: { trainingSetId: id }, token } = data;
    invariant(id, "trainingSetId is required");
    const verifiedToken = verifyJWT(token);
    if (!verifiedToken) {
      console.log("Invalid token")
      socket.emit("training-error", { error: "Invalid token" });
      return;
    }

    const prisma = new PrismaClient();
    const set = await prisma.trainingSet.findUnique({
      where: { id: id }, include: {
        conversations: true,
        trainingSources: true,
        questionsAndAnswers: true,
        missedQuestions: true,
      }
    });
    console.log("set", set)
    if (!set) {
      socket.emit("training-error", { error: "Training set not found" });
      return;
    }

    socket.emit("training-started", data);
    try {
      const result = await createTrainingIndex({ name: set.name, trainingSet: set }) as Partial<TrainingIndex>;
      delete result.vectors
      delete result.docStore
      socket.emit("training-complete", result);
    } catch (error: any) {
      console.log("ERROR", error)
      socket.emit("training-error", { error });
    }
  })

  socket.on("message-public", async (data) => {
    try {
      const { data: { message, mode } } = data as { token: string, data: { message: MessageWithRelations, mode: "one-shot" | "critique" | "refine" } };
      const publicChatInstance = (await prisma.publicChatInstance.findUnique({
        where: {
          id: message.publicChatInstanceId
        },
        include: {
          publicChat: {
            include: {
              trainingSet: {
                include: {
                  questionsAndAnswers: true,
                  missedQuestions: true,
                }
              }
            }
          },
          participants: true,
          messages: {
            include: {
              sender: true,
              conversation: true,
              publicChatInstance: true,
            }
          }
        }
      })) as PublicChatInstanceWithRelations;


      invariant(publicChatInstance, "Conversation must exist");
      const bot = publicChatInstance.participants.find(p => p.type === "BOT");
      invariant(bot, "Bot must exist");
      const userMessage = await prisma.message.create({
        data: {
          text: message.text,
          sender: {
            connect: {
              id: message.participantId,
            }
          },
          publicChatInstance: {
            connect: {
              id: publicChatInstance.id,
            }
          },
          createdAt: new Date(),
        }
      });

      const questionsAndAnswers = publicChatInstance.publicChat.trainingSet.questionsAndAnswers;

      const handleMissedQuestion = async (questionAndAnswer: LLMBrainBridgeResponse) => {
        const missedQuestion = await prisma.missedQuestions.create({
          data: {
            question: questionAndAnswer.question,
            llmAnswer: questionAndAnswer.answer,
            TrainingSet: {
              connect: {
                id: publicChatInstance.publicChat.trainingSet.id,
              }
            },
            correctAnswer: "",
            ignored: false,
            id: "",
          }
        });
        return missedQuestion;
      }

      const llm = new BrainBridgeLangChain(new BrainBridgeStorage(), (missed) => handleMissedQuestion(missed).catch(err => console.error(err)))
      const fullPrompt = promptHeader + "\n\n" + publicChatInstance.publicChat.trainingSet.prompt + "\n\n" + replaceTokens(promptFooter, questionsAndAnswers)

      socket.emit('llm-response-started')
      const response = await llm.getLangChainResponse(
        publicChatInstance.publicChat.trainingSetId,
        userMessage.text,
        fullPrompt,
        publicChatInstance.messages.map(m => `${m.sender.name}: ${m.text}`),
        mode
      )

      const newMessage: MessageWithRelations = {
        id: "",
        text: response,
        createdAt: new Date(),
        sender: bot,
        participantId: bot.id,
        conversationId: undefined,
        conversation: undefined,
        publicChatInstance: publicChatInstance,
        publicChatInstanceId: publicChatInstance.id,
      }
      const result = await storeBotMessage(publicChatInstance, newMessage);
      socket.emit("message", { message: result });
    } catch (error: any) {
      console.error(error)
      socket.emit("message-error", { error });
    }
  });

  socket.on("message", async (data) => {
    try {
      const { token, data: { message, mode } } = data as { token: string, data: { message: MessageWithRelations, mode: "one-shot" | "critique" | "refine" } };
      const verifiedToken = verifyJWT(token);
      if (!verifiedToken) {
        socket.emit("message-error", { error: "Invalid token" });
        return;
      }

      const userData = verifiedToken.body.toJSON() as JSONMap;

      const conversation = await prisma.conversation.findUnique({
        where: {
          id: message.conversationId
        },
        include: {
          trainingSet: {
            include: {
              questionsAndAnswers: true,
              missedQuestions: true,
            }
          },
          participants: true,
          messages: {
            include: {
              sender: true,
            }
          }
        }
      });


      invariant(conversation, "Conversation must exist");
      console.log("conversation", conversation)
      const bot = conversation.participants.find(p => p.name === "Bot");
      invariant(bot, "Bot must exist");
      const userMessage = await storeUserMessage(conversation, message);


      const questionsAndAnswers = conversation.trainingSet.questionsAndAnswers;

      const handleMissedQuestion = async (questionAndAnswer: LLMBrainBridgeResponse) => {
        const missedQuestion = await prisma.missedQuestions.create({
          data: {
            question: questionAndAnswer.question,
            llmAnswer: questionAndAnswer.answer,
            TrainingSet: {
              connect: {
                id: conversation.trainingSetId,
              }
            },
            correctAnswer: "",
            ignored: false,
            id: "",
          }
        });
        return missedQuestion;
      }

      const llm = new BrainBridgeLangChain(new BrainBridgeStorage(), (missed) => handleMissedQuestion(missed).catch(err => console.error(err)))
      const fullPrompt = promptHeader + "\n\n" + conversation.trainingSet.prompt + "\n\n" + replaceTokens(promptFooter, questionsAndAnswers)

      socket.emit('llm-response-started')
      const response = await llm.getLangChainResponse(
        conversation.trainingSetId,
        userMessage.text,
        fullPrompt,
        conversation.messages.map(m => `${m.sender.name}: ${m.text}`),
        mode
      )

      const newMessage: MessageWithRelations = {
        id: "",
        conversationId: conversation.id,
        text: response,
        createdAt: new Date(),
        sender: bot,
        conversation,
        participantId: bot.id,
        publicChatInstance: null,
        publicChatInstanceId: null,
      }
      const result = await storeUserMessage(conversation, newMessage);
      socket.emit("message", { message: result });
    } catch (error: any) {
      console.error(error)
      socket.emit("message-error", { error });
    }
  });
}

async function storeBotMessage(instance: PublicChatInstanceWithRelations, payload: MessageWithRelations) {
  const sender = instance.participants.find(p => p.type === "BOT");
  let responseMessage: MessageWithRelations;
  if (!sender) {
    responseMessage = await prisma.message.create({
      data: {
        text: payload.text,
        sender: {
          create: {
            type: "BOT",
            publicChatInstance: {
              connect: {
                id: instance.id,
              }
            },
            createdAt: new Date(),
          }
        },
        publicChatInstance: {
          connect: {
            id: instance.id,
          }
        },
        createdAt: new Date(),
      },
      ...messageWithRelations
    });
  } else {
    responseMessage = await prisma.message.create({
      data: {
        text: payload.text,
        sender: {
          connect: {
            id: sender.id,
          }
        },
        publicChatInstance: {
          connect: {
            id: instance.id,
          }
        },
        createdAt: new Date(),
      },
      ...messageWithRelations
    });
  }
  return responseMessage;
}

async function storeUserMessage(conversation: (Conversation & {
  participants: Participant[];
}), payload: MessageWithRelations) {
  invariant(payload.conversationId)
  const participant = conversation?.participants.find(p => p.name === payload.sender.name);
  const message = await prisma.message.create({
    data: {
      conversation: {
        connect: {
          id: payload.conversationId,
        }
      },
      sender: {
        connect: {
          id: participant?.id
        }
      },
      text: payload.text,
    },
    select: {
      id: true,
      text: true,
      createdAt: true,
      sender: true,
      participantId: true,
      conversationId: true,
      conversation: true,
    }
  });
  return message;
}


import { Prisma, type QuestionAndAnswer } from '@prisma/client';
import { BrainBridgeLangChain, BrainBridgeStorage, LLMBrainBridgeResponse, promptFooter, promptHeader } from "../lib/llm";
import replaceTokens from "../lib/replace-tokens";

export const trainingSetWithRelations = Prisma.validator<Prisma.TrainingSetArgs>()({
  include: {
    trainingSources: true,
    questionsAndAnswers: true,
    conversations: true,
    missedQuestions: true,
    TrainingSetShares: true,
  },
})

export type TrainingSetWithRelations = Prisma.TrainingSetGetPayload<typeof trainingSetWithRelations>

const trainingIndexWithRelations = Prisma.validator<Prisma.TrainingIndexArgs>()({
  include: {
    trainingSet: true,
  }
});

export type TrainingIndexWithRelations = Prisma.TrainingIndexGetPayload<typeof trainingIndexWithRelations>;

export const messageWithRelations = Prisma.validator<Prisma.MessageArgs>()({
  include: {
    sender: true,
    conversation: true,
    publicChatInstance: true,
  }
});

export type MessageWithRelations = Prisma.MessageGetPayload<typeof messageWithRelations>;

export const conversationWithRelations = Prisma.validator<Prisma.ConversationArgs>()({
  include: {
    messages: messageWithRelations,
    participants: true,
    trainingSet: {
      include: {
        questionsAndAnswers: true,
      }
    }
  }
});

export type ConversationWithRelations = Prisma.ConversationGetPayload<typeof conversationWithRelations>;

const publicChatWithRelations = Prisma.validator<Prisma.PublicChatArgs>()({
  include: {
    trainingSet: true,
  }
});

export type PublicChatWithRelations = Prisma.PublicChatGetPayload<typeof publicChatWithRelations>;

export const publicChatInstanceWithRelations = Prisma.validator<Prisma.PublicChatInstanceArgs>()({
  include: {
    publicChat: {
      include: {
        trainingSet: {
          include: {
            questionsAndAnswers: true,
          }
        }
      }
    },
    messages: messageWithRelations,
    participants: true,
  }
});

export type PublicChatInstanceWithRelations = Prisma.PublicChatInstanceGetPayload<typeof publicChatInstanceWithRelations>;


export type QuestionAndAnswerPartial = Omit<QuestionAndAnswer, "trainingSetId" | "id">;

export type ChatResponseMode = "one-shot" | "critique" | "refine";
