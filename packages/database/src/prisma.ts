import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";
import { DatabaseConfig } from "./config";

const adapter = new PrismaPg({
  connectionString: DatabaseConfig.url,
});

export const prisma = new PrismaClient({
  adapter,
});
