import { defineConfig } from "prisma/config";
import { DatabaseConfig } from "./src/config";

export default defineConfig({
  schema: "src/",
  migrations: {
    path: "src/migrations",
  },
  datasource: {
    url: DatabaseConfig.url,
  },
});
