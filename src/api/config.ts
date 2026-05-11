import { env } from "@lib/env.ts";
const protocol = env("PROTOCOL");
const host = env("HOST");
const port = parseInt(env("PORT"));

export const ServerConfig = {
  protocol,
  host,
  port,
  baseURL: `${protocol}://${host}:${port}`,
};
