import invariant from "tiny-invariant";
import { verifyJWT } from "../../lib/jwt";
import { JSONMap } from "njwt";
import { prisma } from "../../lib/db";
import { Prisma } from '@prisma/client';
import { BrainBridgeLangChain, BrainBridgeStorage, LLMBrainBridgeResponse, promptFooter, promptHeader } from "../../lib/llm";
import replaceTokens from "../../lib/replace-tokens";
import { WithoutId } from "typeorm";
import { storeUserMessage } from "./data-helpers";
import { MessageWithRelations } from "./types";

export function privateMessageHandler(socket) {
  socket.on("message", async (data) => {
    try {
      const { token, data: { message, mode } } = data as { token: string; data: { message: MessageWithRelations; mode: "one-shot" | "critique" | "refine"; }; };
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
      console.log("conversation", conversation);
      const bot = conversation.participants.find(p => p.name === "Bot");
      invariant(bot, "Bot must exist");
      const userMessage = await storeUserMessage(conversation, message);


      const questionsAndAnswers = conversation.trainingSet.questionsAndAnswers;

      const handleMissedQuestion = async (questionAndAnswer: LLMBrainBridgeResponse) => {
        const missedQuestion = await prisma.missedQuestions.create({
          data: {
            question: questionAndAnswer.question,
            llmAnswer: questionAndAnswer.answer,
            trainingSet: {
              connect: {
                id: conversation.trainingSet.id,
              }
            },
            correctAnswer: "",
            ignored: false,
          } as WithoutId<Prisma.MissedQuestionsCreateInput>
        });
        return missedQuestion;
      };

      const llm = new BrainBridgeLangChain(new BrainBridgeStorage(), (missed) => handleMissedQuestion(missed).catch(err => console.error(err)));
      const fullPrompt = promptHeader + "\n\n" + conversation.trainingSet.prompt + "\n\n" + replaceTokens(promptFooter, questionsAndAnswers);

      console.log(conversation.id, 'llm-response-started');
      socket.emit('llm-response-started', {});
      const response = await llm.getLangChainResponse(
        conversation.trainingSetId,
        userMessage.text,
        fullPrompt,
        conversation.messages.map(m => `${m.sender.name}: ${m.text}`),
        mode
      );

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
      };
      const result = await storeUserMessage(conversation, newMessage);
      socket.emit("message", { message: result });
    } catch (error: any) {
      console.error(error);
      socket.emit("message-error", { error: error.message });
    }
  });
}
