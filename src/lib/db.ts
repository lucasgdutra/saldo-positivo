import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Definindo e exportando um tipo que pode ser tanto PrismaClient quanto o cliente estendido
export type PrismaClientWithExtensions = ReturnType<typeof getPrismaClient>;

// Função para criar o cliente Prisma com extensões
function getPrismaClient() {
  return new PrismaClient({
    log: ["query"],
  }).$extends(withAccelerate());
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientWithExtensions | undefined;
};

export const db = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;