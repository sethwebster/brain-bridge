import { PrismaClient } from 'database';
import { env } from "../env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
    // env.NODE_ENV === "development" ? ["query", "error", "warn"] : 
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = (prisma);