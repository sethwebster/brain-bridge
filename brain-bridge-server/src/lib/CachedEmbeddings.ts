import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Prisma, VectorCache } from '@prisma/client';
import crypto from "crypto";
import { prisma } from './db.ts';
import invariant from 'tiny-invariant';
import Mutex from './mutex.ts';
import fs from 'fs';
import path from 'path';
function toSql(value: number[]) {
  return JSON.stringify(value);
}

import * as R from 'ramda';

type Embedding = number[];
type EmbeddingCache = {
  hash: string;
  embedding: Embedding;
}
type VectorCacheWithEmbeds = VectorCache & { embedding: Embedding | null; }
type DocumentWithHashAndCache = {
  hash: string;
  document: string;
  cached: Embedding | null;
}

export class CachedEmbeddings {

  embedder = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY!,
    modelName: "text-embedding-ada-002"
  });

  async embedDocuments(documents: string[]): Promise<number[][]> {

    const hashed = this.hashDocuments(documents)
    const cached = await this.fetchCachedDocumentsByHashes(hashed);

    const todo = cached.filter(c => !c.cached || c.cached === null);
    console.log("Found " + cached.filter(n => n.cached !== null).length + " cached embeddings.")
    console.log("Will create embeddings for " + todo.length + " of " + documents.length + " documents.");

    const remainingDocuments = todo.map(({ document }) => document);
    const batches = R.splitEvery(100, remainingDocuments);
    const rawEmbeddingPromises = batches.map(async (batch, i) => {
      console.log("Embedding batch " + (i+1) + " of " + batches.length + " batches.")
      return await this.embedder.embedDocuments(batch)
    });

    const rawEmbeddings = (await Promise.all(rawEmbeddingPromises)).flat();

    const hashMutex = new Mutex();
    const seenHashes = new Map<string, DocumentWithHashAndCache>();
    const promises = todo.map(async ({ hash, cached, document }, i) => {
      return await hashMutex.run(async () => {
        const embedding = rawEmbeddings[i];
        const hasSeen = seenHashes.has(hash);
        if (hasSeen) {
          return {
            hash,
            cached: embedding,
            document
          }
        }

        if (cached) {
          console.log("Updating embedding for " + hash)
          seenHashes.set(hash, {
            hash,
            document,
            cached: embedding
          })
          return seenHashes.get(hash);
        } else {
          console.log("Creating embedding for " + hash)
          await this.createCachedDocuments([{ hash, cached: embedding, document }]);
          console.log("Created embedding for " + hash)
          seenHashes.set(hash, {
            hash,
            document,
            cached: embedding
          });
          return seenHashes.get(hash);
        }
      });
    }) as Promise<DocumentWithHashAndCache>[]

    const newEmbeddings = await Promise.all(promises);
    const allEmbeddings = hashed.map(({ document, hash }) => {
      const newEmbedding = newEmbeddings.find(e => e.hash === hash)?.cached;
      const oldEmbedding = cached.find(c => c.hash === hash)?.cached;
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
    const result = await this.fetchCachedDocumentsFromFileSystem(hashesWithDocument);
    return hashesWithDocument.map((item) => {
      const found = result.find(r => r.hash === item.hash);
      if (found) {
        return {
          ...item,
          cached: found.cached
        }
      } else {
        return item;
      }
    })
  }

  private async createCachedDocuments(hashed: DocumentWithHashAndCache[]): Promise<void> {
    const basePath = process.env.EMBED_CACHE_PATH;
    invariant(basePath, "EMBED_CACHE_PATH must be set");
    const promises = hashed.map(async ({ hash, cached }) => {
      invariant(cached, "Cached must be set");
      const filePath = path.join(basePath, hash + ".json");
      const exists = fs.existsSync(filePath);
      if (!exists) {
        await fs.writeFileSync(filePath, JSON.stringify(cached));
      }
    });
    await Promise.all(promises);
  }

  private async fetchCachedDocumentsFromFileSystem(hashesWithDocument: DocumentWithHashAndCache[]): Promise<DocumentWithHashAndCache[]> {
    const basePath = process.env.EMBED_CACHE_PATH;
    invariant(basePath, "EMBED_CACHE_PATH must be set");
    const promises = hashesWithDocument.map(async ({ hash, document }) => {
      const filePath = path.join(basePath, hash + ".json");
      const exists = fs.existsSync(filePath);
      if (exists) {
        const cached = await fs.readFileSync(filePath, { encoding: "utf-8" });
        const embed = JSON.parse(cached) as Embedding;
        return {
          hash,
          document,
          cached: embed
        };
      } else {
        return {
          hash,
          document,
          cached: null
        };
      }
    });
    const result = await Promise.all(promises);
    return result;
  }

  private pathForHash(hash: string) {
    const basePath = process.env.EMBED_CACHE_PATH;
    invariant(basePath, "EMBED_CACHE_PATH must be set");
    return path.join(basePath, hash + ".json");
  }

  embedQuery(document: string): Promise<number[]> {
    const result = this.embedDocuments([document]);
    return result.then(r => r[0]);
  }

}
