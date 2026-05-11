import { env } from "../../src/lib/env.ts";

const user = env("PG_USER");
const password = env("PG_PASSWORD");
const host = env("PG_HOST");
const port = env("PG_PORT");
const name = env("PG_NAME");

export const DatabaseConfig = {
  user,
  password,
  host,
  port,
  url: `postgres://${user}:${password}@${host}:${port}/${name}`,
};
