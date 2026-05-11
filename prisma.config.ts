import { defineConfig } from "prisma/config";
import { DatabaseConfig } from "./src/database/config.ts"; // Needs to stay as direct import so prisma cli can resolve

export default defineConfig({
  schema: "src/database/schema.prisma",
  migrations: {
    path: "src/database/migrations",
  },
  datasource: {
    url: DatabaseConfig.url,
  },
});
