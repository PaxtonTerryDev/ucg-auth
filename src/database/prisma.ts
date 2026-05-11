import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client.ts";
import { DatabaseConfig } from "./config.ts";

const adapter = new PrismaPg({
  connectionString: DatabaseConfig.url,
});

export const prisma = new PrismaClient({
  adapter,
});
