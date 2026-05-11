import { Hono } from "hono";
import { ServerConfig } from "@api/config.ts";

const app = new Hono();

app.get("/", (c) => c.text("Hello, Deno!"));

Deno.serve({ port: ServerConfig.port }, app.fetch);
