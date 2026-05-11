import { env } from "@lib/env.ts";

export const ServerConfig = {
  port: parseInt(env("PORT")),
};
