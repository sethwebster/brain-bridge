import { Socket } from "socket.io";
import invariant from "tiny-invariant";
import { prisma } from "../../lib/db.ts";
import replaceTokens from "../../lib/replace-tokens.ts";
import { storeBotMessage } from "./data-helpers.ts";
import { MessageWithRelations, PublicChatInstanceWithRelations } from "./types.ts";
import { promptFooter, promptHeader } from "../../lib/prompt-templates.ts";
import WeviateSimilaritySearcher, { initializeClient } from "../../lib/WeviateSimilaritySearcher.ts";
import { BrainBridgeLangChain, LLMBrainBridgeResponse } from "../../lib/llm.ts";
import ServerData from "../../lib/server-data.ts";

export async function publicMessageHandler(socket: Socket) {
  socket.on("message-public", async (data) => {
    try {
      const { data: { message, mode } } = data as { token: string; data: { message: MessageWithRelations; mode: "one-shot" | "critique" | "refine"; }; };

      invariant(message.publicChatInstanceId, "Public chat instance id must be defined");
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
      const user = await ServerData.fetchUserById(publicChatInstance.publicChat.userId);
      invariant(user, "User must exist");
      const settings = user.userSettings;
      invariant(settings, "User settings must exist");
      const { openAIApiKey } = settings[0];

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

      const cost = {
        tokens: 0,
      }

      const onTokensUsed = (tokens: number) => {
        cost.tokens += tokens;
      }

      invariant(openAIApiKey, "OpenAI API key must be defined");
      const client = initializeClient(openAIApiKey)

      const searcher = new WeviateSimilaritySearcher(publicChatInstance.publicChat.trainingSet.id, client);

      const llm = new BrainBridgeLangChain(
        {
          openAIApiKey,
          similaritySearcher: searcher,
          handlers: {
            onLowConfidenceAnswer: (missed) => handleMissedQuestion(missed).catch(err => console.error(err)),
            onTokensUsed,
            onTokenReceived: () => { },
          }
        }
      );

      const fullPrompt = promptHeader + "\n\n" + publicChatInstance.publicChat.trainingSet.prompt + "\n\n" + replaceTokens(promptFooter, questionsAndAnswers);

      socket.emit('llm-response-started');
      const response = await llm.getLangChainResponse(
        publicChatInstance.publicChat.trainingSetId,
        userMessage.text,
        fullPrompt,
        publicChatInstance.messages.map(m => `${m.sender.name}: ${m.text}`),
        mode
      );
      invariant(bot, "Bot must exist")
      const newMessage: MessageWithRelations = {
        id: "",
        text: response,
        createdAt: new Date(),
        sender: bot,
        participantId: "",
        conversationId: "",
        conversation: null,
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
