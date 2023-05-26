import { Prisma, QuestionAndAnswer } from '@prisma/client';

const trainingSetWithRelations = Prisma.validator<Prisma.TrainingSetArgs>()({
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

const messageWithRelations = Prisma.validator<Prisma.MessageArgs>()({
  include: {
    sender: true,
    conversation: true,
  }
});

export type MessageWithRelations = Prisma.MessageGetPayload<typeof messageWithRelations>;

const conversationWithRelations = Prisma.validator<Prisma.ConversationArgs>()({
  include: {
    messages: messageWithRelations,
    participants: true,
  }
});

export type ConversationWithRelations = Prisma.ConversationGetPayload<typeof conversationWithRelations>;

export type QuestionAndAnswerPartial = Omit<QuestionAndAnswer, "trainingSetId" | "id">;
