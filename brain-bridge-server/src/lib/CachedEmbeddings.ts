import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Prisma, VectorCache } from '@prisma/client';
import crypto from "crypto";
import { prisma } from './db.ts';
import invariant from 'tiny-invariant';
import Mutex from './mutex.ts';

function toSql(value: number[]) {
  return JSON.stringify(value);
}

type VectorCacheWithEmbeds = VectorCache & { embedding: number[] | null; }
type DocumentWithHashAndCache = {
  hash: string;
  document: string;
  cached: VectorCacheWithEmbeds | null;
}

function generateUniqueId(): string {
  const prefix = 'cli';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const length = 22; // Total length of the ID minus the length of prefix

  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return prefix + result;
}


export class CachedEmbeddings {

  embedder = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY!,
    modelName: "text-embedding-ada-002"
  });



  async embedDocuments(documents: string[]): Promise<number[][]> {

    const hashed = this.hashDocuments(documents)
    const cached = await this.fetchCachedDocumentsByHashes(hashed);
    // console.log("Lengths", cached.map(n => n.cached))
    const todo = cached.filter(c => !c.cached || c.cached.embedding === null);
    console.log("Found " + cached.filter(n => !!n).length + " cached embeddings.")
    console.log("Will create embeddings for " + todo.length + " of " + documents.length + " documents.");

    const remainingDocuments = todo.map(({ document }) => document);
    const rawEmbeddings = await this.embedder.embedDocuments(remainingDocuments);

    const hashMutex = new Mutex();
    const seenHashes = new Map<string, DocumentWithHashAndCache>();
    const promises = todo.map(async ({ hash, cached, document }, i) => {
      return await hashMutex.run(async () => {
        const embedding = rawEmbeddings[i];
        const ready = toSql(embedding);
        const hasSeen = seenHashes.has(hash);
        if (hasSeen) {
          return {
            hash,
            cached: {
              hash,
              embedding,
              createdAt: new Date(),
              updatedAt: new Date(),
              id: "0"
            }
          }
        }

        if (cached) {
          await prisma.$executeRaw`UPDATE "VectorCache" SET embedding = (${ready}::vector) WHERE hash = ${hash}`;
          console.log("Updated embedding for " + hash);
          seenHashes.set(hash, {
            hash,
            document,
            cached: {
              ...cached,
              embedding
            }
          })
          return seenHashes.get(hash);
        } else {
          const id = generateUniqueId();
          await prisma.$executeRaw`INSERT INTO "VectorCache" (id, hash, embedding, "createdAt", "updatedAt") VALUES (${id}, ${hash}, ${ready}::vector, now(), now())`;
          console.log("Created embedding for " + hash)
          seenHashes.set(hash, {
            hash,
            document,
            cached: {
              hash,
              embedding,
              createdAt: new Date(),
              updatedAt: new Date(),
              id: "0"
            }
          });
          return seenHashes.get(hash);
        }
      });
    }) as Promise<DocumentWithHashAndCache>[]

    const newEmbeddings = await Promise.all(promises);
    const allEmbeddings = hashed.map(({ document, hash }) => {
      const newEmbedding = newEmbeddings.find(e => e.hash === hash)?.cached?.embedding;
      const oldEmbedding = cached.find(c => c.hash === hash)?.cached?.embedding;
      const embed = (newEmbedding || oldEmbedding);
      return embed;
    }).filter(e => e !== null) as number[][];
    console.log("Documents length", documents.length, "embeddings length", allEmbeddings.length);
    return allEmbeddings;
  }

  private removeAlreadyCachedDocuments(hashed: { hash: string; document: string; }[], cached: { embedding: any; hash: string; id: string; createdAt: Date; updatedAt: Date; }[]) {
    return hashed.filter(({ hash }) => {
      return !cached.find(c => c.hash === hash);
    });
  }

  private hashDocuments(documents: string[]): DocumentWithHashAndCache[] {
    const hashed = documents.map(document => {
      const hash = crypto.createHash('sha256');
      const updated = hash.update(document);
      const key = updated.digest('hex');
      return {
        hash: key, document, cached: null
      };
    })
    // .reduce((hashed, doc) => {
    //   if (!hashed.find(h => h.hash === doc.hash)) {
    //     hashed.push(doc);
    //   }
    //   return hashed;
    // }, [] as { hash: string; document: string; }[]);

    return hashed;
  }

  private async fetchCachedDocumentsByHashes(hashesWithDocument: DocumentWithHashAndCache[]): Promise<DocumentWithHashAndCache[]> {
    const keys = hashesWithDocument.map(({ hash }) => hash);
    const result = (await prisma.$queryRaw`
      SELECT "hash", "embedding"::text FROM "VectorCache" where hash in (${Prisma.join(keys)})
    ` as (VectorCache & { embedding: number[]; })[]).map(c => {
      return {
        ...c,
        embedding: JSON.parse(c.embedding as any as string)
      };
    });
    return hashesWithDocument.map((item) => {
      const found = result.find(r => r.hash === item.hash);
      if (found) {
        return {
          ...item,
          cached: found
        }
      } else {
        return item;
      }
    })
  }

  embedQuery(document: string): Promise<number[]> {
    const result = this.embedDocuments([document]);
    return result.then(r => r[0]);
  }

}
