import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const globalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV === "development") {
  globalPrisma.prisma = prisma;
}
