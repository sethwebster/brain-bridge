import { Socket } from "socket.io";
import invariant from "tiny-invariant";
import { prisma } from "../../lib/db";
import { BrainBridgeLangChain, BrainBridgeStorage, LLMBrainBridgeResponse, promptFooter, promptHeader } from "../../lib/llm";
import replaceTokens from "../../lib/replace-tokens";
import { storeBotMessage } from "./data-helpers";
import { MessageWithRelations, PublicChatInstanceWithRelations } from "./types";

export async function publicMessageHandler(socket: Socket) {
  socket.on("message-public", async (data) => {
    try {
      const { data: { message, mode } } = data as { token: string; data: { message: MessageWithRelations; mode: "one-shot" | "critique" | "refine"; }; };
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
            trainingSet: {
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
      };

      const llm = new BrainBridgeLangChain(new BrainBridgeStorage(), (missed) => handleMissedQuestion(missed).catch(err => console.error(err)));
      const fullPrompt = promptHeader + "\n\n" + publicChatInstance.publicChat.trainingSet.prompt + "\n\n" + replaceTokens(promptFooter, questionsAndAnswers);

      socket.emit('llm-response-started');
      const response = await llm.getLangChainResponse(
        publicChatInstance.publicChat.trainingSetId,
        userMessage.text,
        fullPrompt,
        publicChatInstance.messages.map(m => `${m.sender.name}: ${m.text}`),
        mode
      );

      const newMessage: MessageWithRelations = {
        id: "",
        text: response,
        createdAt: new Date(),
        sender: bot,
        participantId: undefined,
        conversationId: undefined,
        conversation: undefined,
        publicChatInstance: publicChatInstance,
        publicChatInstanceId: publicChatInstance.id,
      };
      const result = await storeBotMessage(publicChatInstance, newMessage);
      socket.emit("message", { message: result });
    } catch (error: any) {
      console.error(error);
      socket.emit("message-error", { error: error.message });
    }
  });

}
