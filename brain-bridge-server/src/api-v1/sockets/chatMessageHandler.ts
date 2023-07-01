import invariant from "tiny-invariant";
import { Conversation, Message, Participant, Prisma, PublicChatInstance } from '@prisma/client';
import { prisma } from "../../lib/db.ts";
import { BrainBridgeAdditionalOptions, BrainBridgeLangChain, BrainBridgeStorage, LLMBrainBridgeResponse } from "../../lib/llm.ts";
import replaceTokens from "../../lib/replace-tokens.ts";
import { ChatResponseMode, ConversationWithRelations, MessageWithRelations, PublicChatInstanceWithRelations } from "./types.ts";
import { promptFooter, promptHeader } from "../../lib/prompt-templates.ts";
import { runWithIndicator } from "./runWithIndicator.ts";
import { GenericMessageHandlerWithCosts, TokenUsageFn } from "./genericMessageHandler.ts";

// interface RecursionPayload {
//   message: Omit<MessageWithRelations, "publicChatInstanceId" | "publicChatInstance"> | undefined | null;
// }

export class ChatMessageHandler extends GenericMessageHandlerWithCosts<{ message: MessageWithRelations }> {
  getOptimisticResponse(message: Message & { conversation: Conversation | null; sender: Participant; publicChatInstance: PublicChatInstance | null; }): { message: MessageWithRelations } {
    return {
      message: {
        ...message,
        text: message.text,
      } as MessageWithRelations
    }
  }

  private async generateResponseWithCostPrivate(conversation: ConversationWithRelations, message: MessageWithRelations, chatResponseMode: ChatResponseMode, onTokensUsed: TokenUsageFn): Promise<MessageWithRelations> {
    const bot = conversation.participants.find(p => p.name === "Bot");
    invariant(bot, "Bot must exist");
    const questionsAndAnswers = conversation.trainingSet.questionsAndAnswers;
    const fullPrompt = promptHeader + "\n\n" + conversation.trainingSet.prompt + "\n\n" + replaceTokens(promptFooter, questionsAndAnswers);
    const handleMissedQuestion = this.handleMissedQuestion.bind(this, conversation);
    const options = conversation.trainingSet.trainingOptions as BrainBridgeAdditionalOptions;

    const llm = new BrainBridgeLangChain(
      {
        store: new BrainBridgeStorage(),
        handlers: {
          onLowConfidenceAnswer: (missed) => handleMissedQuestion(missed).catch(err => console.error(err)),
          onTokensUsed,
        },
        options
      }
    );
    invariant(message.conversationId, "Conversation id must be defined");
    let response = "";
    response = await llm.getLangChainResponse(
      conversation.trainingSetId,
      message.text,
      fullPrompt,
      conversation.messages.sort((a, b) => {
        if (a.createdAt === b.createdAt) {
          return 0;
        }
        return a.createdAt > b.createdAt ? 1 : -1;
      }).map(m => `${m.sender.name}: ${m.text}`),
      chatResponseMode
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
    return newMessage;
  }

  private async generateResponseWithCostPublic(conversation: PublicChatInstanceWithRelations, message: MessageWithRelations, chatResponseMode: ChatResponseMode, onTokensUsed: TokenUsageFn): Promise<MessageWithRelations> {
    let bot = conversation.participants.find(p => p.type === "BOT");
    if (!bot) {
      bot = await prisma.participant.create({
        data: {
          name: "Bot",
          type: "BOT",
          id: undefined,
          publicChatInstance: {
            connect: {
              id: conversation.id,
            }
          }
        }
      });
    }
    const questionsAndAnswers = conversation.publicChat.trainingSet.questionsAndAnswers;
    const fullPrompt = promptHeader + "\n\n" + conversation.publicChat.trainingSet.prompt + "\n\n" + replaceTokens(promptFooter, questionsAndAnswers);
    const handleMissedQuestion = async (missed: LLMBrainBridgeResponse) => { };
    // this.handleMissedQuestion.bind(this, conversation.publicChat);
    const options = conversation.publicChat.trainingSet.trainingOptions as BrainBridgeAdditionalOptions;
    const llm = new BrainBridgeLangChain(
      {
        store: new BrainBridgeStorage(),
        handlers: {
          onLowConfidenceAnswer: (missed) => handleMissedQuestion(missed).catch(err => console.error(err)),
          onTokensUsed,
        },
        options
      }
    );
    invariant(message.publicChatInstanceId, "publicChatInstanceId must be defined");
    let response = "";
    response = await llm.getLangChainResponse(
      conversation.publicChat.trainingSetId,
      message.text,
      fullPrompt,
      conversation.messages.sort((a, b) => {
        if (a.createdAt === b.createdAt) {
          return 0;
        }
        return a.createdAt > b.createdAt ? 1 : -1;
      }).map(m => `${m.sender.name}: ${m.text}`),
      chatResponseMode
    );

    const newMessage: MessageWithRelations = {
      id: "",
      text: response,
      createdAt: new Date(),
      sender: bot,
      conversationId: null,
      conversation: null,
      participantId: bot.id,
      publicChatInstance: conversation,
      publicChatInstanceId: conversation.id,
    };
    return newMessage;
  }

  async generateResponseWithCost(conversation: ConversationWithRelations | PublicChatInstanceWithRelations, message: MessageWithRelations, chatResponseMode: ChatResponseMode, onTokensUsed: TokenUsageFn): Promise<MessageWithRelations> {
    const response = await runWithIndicator(this.io, this.room, async () => {
      const type = (conversation as ConversationWithRelations).trainingSetId ? "conversation" : "publicChatInstance";
      switch (type) {
        case "conversation":
          return await this.generateResponseWithCostPrivate(conversation as ConversationWithRelations, message, chatResponseMode, onTokensUsed);
        case "publicChatInstance":
          return await this.generateResponseWithCostPublic(conversation as PublicChatInstanceWithRelations, message, chatResponseMode, onTokensUsed);
      }
    });
    invariant(response, "Response must exist");
    return response;
  }

  private async handleMissedQuestion(conversation: ConversationWithRelations, questionAndAnswer: LLMBrainBridgeResponse) {
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
      } as Prisma.MissedQuestionsCreateInput
    });
    return missedQuestion;
  };
}


// export function privateMessageHandler(socket: Socket, io: Server) {
//   return;
//   let attempts = 0;

//   async function handleMessage(data: Record<string, any>, recursion?: RecursionPayload) {
//     let userMessage: Omit<MessageWithRelations, "publicChatInstanceId" | "publicChatInstance"> | null = null;

//     try {
//       const { data: { message, mode } } = data as { token: string; data: { message: MessageWithRelations; mode: "one-shot" | "critique" | "refine"; }; };
//       invariant(message, "Message must be defined");
//       invariant(message.conversationId, "Conversation id must be defined");
//       runWithIndicator(io, getRoomId(message.conversationId), async () => {
//         invariant(message.conversationId, "Conversation id must be defined");
//         const conversation = await loadConversation(message);
//         invariant(conversation, "Conversation must exist");
//         // console.log("conversation", conversation);
//         const bot = conversation.participants.find(p => p.name === "Bot");
//         invariant(bot, "Bot must exist");
//         runWithCostStorage(conversation, async (onTokensUsed) => {

//           // Sometimes, things fail. We've allowed a recursive call
//           // to try again. In the case of a retry, we don't want to
//           // store the message again.
//           if (!recursion) {
//             userMessage = await storeUserMessage(conversation, message);
//             io.in(getRoomId(conversation.id)).emit("message", { message: userMessage });
//           } else {
//             invariant(recursion.message, "Previous message must exist on recursive call");
//             userMessage = recursion.message;
//           }

//           const questionsAndAnswers = conversation.trainingSet.questionsAndAnswers;
//           const fullPrompt = promptHeader + "\n\n" + conversation.trainingSet.prompt + "\n\n" + replaceTokens(promptFooter, questionsAndAnswers);

//           /**
//            * Called when a low-confidence answer is returned
//            * @param questionAndAnswer
//            * @returns
//           */
//           const handleMissedQuestion = async (questionAndAnswer: LLMBrainBridgeResponse) => {
//             const missedQuestion = await prisma.missedQuestions.create({
//               data: {
//                 question: questionAndAnswer.question,
//                 llmAnswer: questionAndAnswer.answer,
//                 trainingSet: {
//                   connect: {
//                     id: conversation.trainingSet.id,
//                   }
//                 },
//                 correctAnswer: "",
//                 ignored: false,
//               } as Prisma.MissedQuestionsCreateInput
//             });
//             return missedQuestion;
//           };

//           const llm = new BrainBridgeLangChain(new BrainBridgeStorage(), (missed) => handleMissedQuestion(missed).catch(err => console.error(err)), onTokensUsed);
//           invariant(message.conversationId, "Conversation id must be defined");

//           let response = "";
//           response = await llm.getLangChainResponse(
//             conversation.trainingSetId,
//             userMessage.text,
//             fullPrompt,
//             conversation.messages.map(m => `${m.sender.name}: ${m.text}`),
//             mode
//           );

//           const newMessage: MessageWithRelations = {
//             id: "",
//             conversationId: conversation.id,
//             text: response,
//             createdAt: new Date(),
//             sender: bot,
//             conversation,
//             participantId: bot.id,
//             publicChatInstance: null,
//             publicChatInstanceId: null,
//           };
//           invariant(conversation.id, "Conversation ID must exist")
//           invariant(message.conversationId, "Conversation ID must exist")
//           const result = await storeUserMessage(conversation, newMessage);
//           io.in(getRoomId(message.conversationId)).emit("message", { message: result });
//         });
//       });
//     } catch (error: any) {
//       attempts++;
//       console.error("privateMessageHandlerError", error, "attempts", attempts);
//       if (attempts > 3) {
//         socket.emit("message-error", { error: error.message });
//       } else {
//         return handleMessage(data, {
//           message: userMessage
//         })
//       }
//     }
//   }

//   // socket.on("message", handleMessage);


//   async function loadConversation(message: MessageWithRelations) {
//     invariant(message.conversationId, "Conversation id must be defined");
//     return await prisma.conversation.findUnique({
//       where: {
//         id: message.conversationId
//       },
//       include: {
//         trainingSet: {
//           include: {
//             questionsAndAnswers: true,
//             missedQuestions: true,
//           }
//         },
//         participants: true,
//         messages: {
//           include: {
//             sender: true,
//           }
//         }
//       }
//     });
//   }
// }
