import { env } from "../../src/lib/env.ts";

const user = env("POSTGRES_USER");
const password = env("POSTGRES_PASSWORD");
const host = env("POSTGRES_HOST");
const port = env("POSTGRES_PORT");
const name = env("POSTGRES_DB");

export const DatabaseConfig = {
  user,
  password,
  host,
  port,
  url: `postgres://${user}:${password}@${host}:${port}/${name}`,
};
