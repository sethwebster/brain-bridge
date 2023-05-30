import { Prisma, type QuestionAndAnswer } from '@prisma/client';

export const trainingSetWithRelations = Prisma.validator<Prisma.TrainingSetArgs>()({
  include: {
    trainingSources: true,
    questionsAndAnswers: true,
    conversations: true,
  }
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

const conversationWithRelations = Prisma.validator<Prisma.ConversationArgs>()({
  include: {
    messages: messageWithRelations,
    participants: true,
    trainingSet: true,
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
    publicChat: true,
    messages: messageWithRelations,
    participants: true,
  }
});

export type PublicChatInstanceWithRelations = Prisma.PublicChatInstanceGetPayload<typeof publicChatInstanceWithRelations>;


export type QuestionAndAnswerPartial = Omit<QuestionAndAnswer, "trainingSetId" | "id">;

export type ChatResponseMode = "one-shot" | "critique" | "refine";