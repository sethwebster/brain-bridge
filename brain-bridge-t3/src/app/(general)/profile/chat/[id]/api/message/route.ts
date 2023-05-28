import fs from 'fs'
import path from 'path'
import { type Conversation, type Message, type Participant } from "@prisma/client";
import { type MessageWithRelations } from "~/interfaces/types";
import { HNSWLib } from "langchain/vectorstores";
import { type Session } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import { env } from '~/env.mjs';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { LLMChain, PromptTemplate } from 'langchain';
import { OpenAIChat } from 'langchain/llms';
import { prisma } from '~/server/db';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to send a message");
  const payload = await req.json() as MessageWithRelations;
  invariant(payload.conversationId, "Conversation id must be provided");
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: payload.conversationId,
    },
    include: {
      participants: true,
      messages: true,
    }
  });
  invariant(conversation, "Conversation must exist");

  const userMessage = await storeUserMessage(conversation, payload, session);
  const message = await getLLMResponse(session, conversation, userMessage.text);
  return NextResponse.json(message);
}

export async function getLLMResponseDirect(conversationId: string, text: string, trainingSetId: string, history: MessageWithRelations[]) {
  const trainingSet = await prisma.trainingSet.findFirst({
    where: {
      id: trainingSetId,
    }
  });
  invariant(trainingSet, "Training set must exist");
  const trainingIndex = await prisma.trainingIndex.findFirst({
    where: {
      trainingSetId: trainingSetId,
    }
  });
  invariant(trainingIndex, "Training index must exist");

  const tempFilePath = getTempFilePath(conversationId + "-" + trainingIndex.id);
  fs.mkdirSync(tempFilePath, { recursive: true });
  const indexPath = path.join(tempFilePath, `hnswlib.index`);
  const docStorePath = path.join(tempFilePath, `docstore.json`);
  const argsFilePath = path.join(tempFilePath, `args.json`);
  fs.writeFileSync(indexPath, Buffer.from(trainingIndex.vectors));
  fs.writeFileSync(docStorePath, Buffer.from(trainingIndex.docStore));
  fs.writeFileSync(argsFilePath, `{"space":"cosine","numDimensions":1536}`);
  const index = await HNSWLib.load(tempFilePath, new OpenAIEmbeddings())
  const llmMessage = await generateResponse({
    basePrompt: trainingSet.prompt,
    history: history.map(m => `${m.sender.name}: ${m.text}`),
    prompt: text,
    store: index,
  });
  return llmMessage;
}

async function getLLMResponse(session: Session, conversation: (Conversation & {
  participants: Participant[];
  messages: Message[]
}), text: string) {
  const trainingSet = await prisma.trainingSet.findFirst({
    where: {
      id: conversation.trainingSetId,
    }
  });
  invariant(trainingSet, "Training set must exist");
  const trainingIndex = await prisma.trainingIndex.findFirst({
    where: {
      trainingSetId: conversation.trainingSetId,
    }
  });
  invariant(trainingIndex, "Training index must exist");
  const tempFilePath = getTempFilePath(conversation.id + "-" + trainingIndex.id);
  fs.mkdirSync(tempFilePath, { recursive: true });
  const indexPath = path.join(tempFilePath, `hnswlib.index`);
  const docStorePath = path.join(tempFilePath, `docstore.json`);
  const argsFilePath = path.join(tempFilePath, `args.json`);
  fs.writeFileSync(indexPath, Buffer.from(trainingIndex.vectors));
  fs.writeFileSync(docStorePath, Buffer.from(trainingIndex.docStore));
  fs.writeFileSync(argsFilePath, `{"space":"cosine","numDimensions":1536}`);
  const bot = conversation.participants.find(p => p.name === "Bot");
  invariant(bot, "Bot must exist");
  const index = await HNSWLib.load(tempFilePath, new OpenAIEmbeddings())

  const llmMessage = await generateResponse({
    basePrompt: trainingSet.prompt,
    history: conversation.messages.map(m => m.text),
    prompt: text,
    store: index,
  });
  const message: MessageWithRelations = {
    id: "",
    conversationId: conversation.id,
    text: llmMessage,
    createdAt: new Date(),
    sender: bot,
    conversation,
    participantId: bot.id,
    publicChatInstance: null,
    publicChatInstanceId: null,
  }
  const result = await storeUserMessage(conversation, message);
  return result;
}

const model = new OpenAIChat({
  temperature: 0.2,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo'
});


const generateResponse = async ({
  basePrompt,
  history,
  prompt,
  store
}: { basePrompt: string, history: string[], prompt: string, store: HNSWLib }): Promise<string> => {
  // Parse and initialize the Prompt
  const promptTemplate = new PromptTemplate({
    template: basePrompt,
    inputVariables: ["history", "context", "prompt"]
  });

  // Create the LLM Chain
  const llmChain = new LLMChain({
    llm: model,
    prompt: promptTemplate,
  });
  // Search for related context/documents in the vectorStore directory
  const data = await store.similaritySearch(prompt, 2);
  const context: string[] = [];
  data.filter(d => d.pageContent.trim().length > 0).forEach((item) => {
    context.push(`Context:\n${item.pageContent.trim()}`)
  });
  // Run the LLM Chain
  const result = await llmChain.call({ prompt, context: context.join('\n\n'), history });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result.text;
}

function getTempFilePath(name: string) {
  return path.join(env.TEMP_FILE_PATH, name);
}

async function storeUserMessage(conversation: (Conversation & {
  participants: Participant[];
}), payload: MessageWithRelations, session?: Session) {
  invariant(payload.conversationId)
  const participant = conversation?.participants.find(p => p.name === session?.user.name || p.name === "Bot");
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
