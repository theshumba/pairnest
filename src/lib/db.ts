import type { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient | null = null;

function getPrisma() {
  if (!prismaClient) {
    // Lazy-load to avoid initializing Prisma in demo mode.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaClient } = require("@prisma/client");
    prismaClient = new PrismaClient();
  }
  return prismaClient;
}

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      return getPrisma()[prop as keyof PrismaClient];
    },
  }
) as PrismaClient;
