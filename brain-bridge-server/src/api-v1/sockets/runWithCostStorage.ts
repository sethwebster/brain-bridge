import { prisma } from "../../lib/db.ts";
import { ConversationWithRelations } from "./types.ts";

export async function runWithCostStorage(conversation: Pick<ConversationWithRelations, "id" | "trainingSet">, fn: (onTokensUsed: (tokens: number) => void) => Promise<void>) {
  const cost = {
    tokens: 0,
    stored: false
  };
  try {

    // Handler for logging token usage
    // -- used later when the response is complete
    // -- to log the usage
    const onTokensUsed = (tokens: number) => {
      cost.tokens += tokens;
    };

    await fn(onTokensUsed);
  } catch (err: any) {
    console.log('runWithCostStorage', err);
    throw err;
  } finally {
    console.log("Storing usage:", "Conversation ID:", conversation.id, "Tokens:", cost.tokens);
    saveUsage(conversation, cost);
  }
}
function saveUsage(conversation: Pick<ConversationWithRelations, "id" | "trainingSet">, cost: { tokens: number; stored: boolean; }) {
  prisma.usage.create({
    data: {
      user: {
        connect: {
          id: conversation.trainingSet.userId,
        },
      },
      trainingSet: {
        connect: {
          id: conversation.trainingSet.id,
        },
      },
      count: cost.tokens,
      type: "TOKEN",
      purpose: "GENERATE",
      updatedAt: new Date(),
      createdAt: new Date(),
      id: undefined,
      userId: undefined,
      trainingSetId: undefined,
    },
  }).catch(err => console.error(err)).then(() => {
    console.log("usage saved");
    cost.stored = true;
  });
}
