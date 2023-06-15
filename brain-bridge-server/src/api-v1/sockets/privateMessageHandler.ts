import invariant from "tiny-invariant";
import { verifyJWT } from "../../lib/jwt";
import { JSONMap } from "njwt";
import { prisma } from "../../lib/db";
import { Prisma } from '@prisma/client';
import { BrainBridgeLangChain, BrainBridgeStorage, LLMBrainBridgeResponse } from "../../lib/llm";
import replaceTokens from "../../lib/replace-tokens";
import { WithoutId } from "typeorm";
import { storeUserMessage } from "./data-helpers";
import { MessageWithRelations } from "./types";
import { Server, Socket } from "socket.io";
import { getRoomId } from "./roomsHandler";
import { promptFooter, promptHeader } from "../../lib/prompt-templates";

export function privateMessageHandler(socket: Socket, io: Server) {
  let attempts = 0;

  async function handleMessage(data: Record<string, any>, recursive?: boolean, prevMessage?: Omit<MessageWithRelations, "publicChatInstanceId" | "publicChatInstance"> | null) {
    let userMessage: Omit<MessageWithRelations, "publicChatInstanceId" | "publicChatInstance"> | null = null;
    try {
      const { token, data: { message, mode } } = data as { token: string; data: { message: MessageWithRelations; mode: "one-shot" | "critique" | "refine"; }; };
      const verifiedToken = verifyJWT(token);
      if (!verifiedToken) {
        socket.emit("message-error", { error: "Invalid token" });
        return;
      }

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

      if (!recursive) {
        userMessage = await storeUserMessage(conversation, message);
        io.in(getRoomId(conversation.id)).emit("message", { message: userMessage });
      } else {
        userMessage = prevMessage;
      }
      const questionsAndAnswers = conversation.trainingSet.questionsAndAnswers;

      /**
       * Called when a low-confidence answer is returned
       * @param questionAndAnswer
       * @returns
       */
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

      console.log((await io.in(getRoomId(message.conversationId)).fetchSockets()).length, "listeners");
      io.in(getRoomId(message.conversationId)).emit('llm-response-started', {})

      let response = "";
      response = await llm.getLangChainResponse(
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
      io.in(getRoomId(message.conversationId)).emit("message", { message: result });
    } catch (error: any) {
      attempts++;
      console.error("privateMessageHandlerError", error, "attempts", attempts);
      if (attempts > 3) {
        socket.emit("message-error", { error: "Unable to connect to Vector Database" });
      } else {
        return handleMessage(data, true, userMessage)
      }
    }
  }

  socket.on("message", handleMessage);
}
