import invariant from "tiny-invariant";
import { Conversation, Message, Participant, Prisma, PublicChatInstance } from '@prisma/client';
import { prisma } from "../../lib/db.ts";
import replaceTokens from "../../lib/replace-tokens.ts";
import { ChatResponseMode, ConversationWithRelations, MessageWithRelations, PublicChatInstanceWithRelations, publicChatInstanceWithRelations } from "./types.ts";
import { promptFooter, promptHeader } from "../../lib/prompt-templates.ts";
import { runWithIndicator } from "./runWithIndicator.ts";
import { GenericMessageHandlerWithCosts, TokenUsageFn } from "./genericMessageHandler.ts";
import WeviateSimilaritySearcher, { initializeClient } from "../../lib/WeviateSimilaritySearcher.ts";
import { BrainBridgeAdditionalOptions, BrainBridgeLangChain, LLMBrainBridgeResponse } from "../../lib/llm.ts";
import ServerData from "../../lib/server-data.ts";

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

    const handleTokenReceived = (token: string, responsePhase: ChatResponseMode) => {
      this.io.in(this.room).emit("message-token", { token, conversationId: conversation.id, responsePhase: responsePhase })
    }

    const user = await ServerData.fetchUserById(conversation.trainingSet.userId);
    invariant(user, "User must be defined");
    invariant(user?.userSettings[0], "User settings must be defined");
    const { openAIApiKey } = user?.userSettings[0];
    invariant(openAIApiKey, "OpenAI API key must be defined");
    const client = initializeClient(openAIApiKey as string)
    const searcher = new WeviateSimilaritySearcher(`Training_Set_${conversation.trainingSet.id}`, client);

    const llm = new BrainBridgeLangChain(
      {
        openAIApiKey,
        similaritySearcher: searcher,
        handlers: {
          onLowConfidenceAnswer: (missed) => handleMissedQuestion(missed).catch(err => console.error(err)),
          onTokensUsed,
          onTokenReceived: handleTokenReceived,
        },
        options: {
          ...conversation.trainingSet.trainingOptions as BrainBridgeAdditionalOptions
        }
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
      chatResponseMode,
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

    const handleTokenReceived = (token: string, responsePhase: ChatResponseMode) => {
      this.io.in(this.room).emit("message-token", { token, conversationId: conversation.id, responsePhase: responsePhase })
    }

    const user = await ServerData.fetchUserById(conversation.publicChat.userId);
    invariant(user, "User must be defined");
    invariant(user?.userSettings[0], "User settings must be defined");
    const { openAIApiKey } = user?.userSettings[0];
    invariant(openAIApiKey, "OpenAI API key must be defined");
    const client = initializeClient(openAIApiKey as string)
    const searcher = new WeviateSimilaritySearcher(`Training_Set_${conversation.publicChat.trainingSet.id}`, client);

    const llm = new BrainBridgeLangChain(
      {
        openAIApiKey,
        similaritySearcher: searcher,
        handlers: {
          onLowConfidenceAnswer: (missed) => handleMissedQuestion(missed).catch(err => console.error(err)),
          onTokensUsed,
          onTokenReceived: handleTokenReceived,
        }
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
