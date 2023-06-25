import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Prisma, VectorCache } from '@prisma/client';
import crypto from "crypto";
import { prisma } from './db.ts';

function toSql(value: number[]) {
  return JSON.stringify(value);
}
export class CachedEmbeddings {

  embedder = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY!,
    modelName: "text-embedding-ada-002"
  });

  async embedDocuments(documents: string[]): Promise<number[][]> {

    const hashed = documents.map(document => {
      const hash = crypto.createHash('sha256');
      const updated = hash.update(document);
      const key = updated.digest('hex');
      return {
        hash: key, document
      };
    });

    const keys = hashed.map(({ hash }) => hash);

    const cached = (await prisma.$queryRaw`
      SELECT "hash", "embedding"::text FROM "VectorCache" where hash in (${Prisma.join(keys)})
    ` as (VectorCache & { embedding: number[]; })[]).map(c => {
      return {
        ...c,
        embedding: JSON.parse(c.embedding as any as string)
      };
    });

    console.log("Found " + cached.length + " cached embeddings.")

    const filtered = hashed.filter(({ hash }) => {
      return !cached.find(c => c.hash === hash); // && c.embedding && c.embedding.length > 0);
    });

    console.log("Will create embeddings for " + filtered.length + " of " + documents.length + " documents.");

    const rawEmbeddings = await this.embedder.embedDocuments(filtered.map(({ document }) => document));

    const promises = rawEmbeddings.map(async (embedding, i) => {
      const isUpdated = !!cached.find(c => c.hash === filtered[i].hash);
      if (!isUpdated) {
        await prisma.vectorCache.create({
          data: {
            hash: filtered[i].hash,
          }
        });
      }
      const ready = toSql(embedding);

      await prisma.$executeRaw`UPDATE "VectorCache" SET embedding = (${ready}::vector) WHERE hash = ${filtered[i].hash}`;
      return embedding;
    });

    const newEmbeddings = await Promise.all(promises);

    const embeddings = cached.filter(c => !filtered.find(f => f.hash === c.hash)).map(c => c.embedding).concat(newEmbeddings);

    return embeddings;
  }

  embedQuery(document: string): Promise<number[]> {
    const result = this.embedDocuments([document]);
    return result.then(r => r[0]);
  }

}
