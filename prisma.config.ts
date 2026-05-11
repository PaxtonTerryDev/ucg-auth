import { defineConfig } from "prisma/config";
import { DatabaseConfig } from "@database/config.ts";

export default defineConfig({
  schema: "src/database/schema.prisma",
  migrations: {
    path: "src/database/migrations",
  },
  datasource: {
    url: DatabaseConfig.url,
  },
});
