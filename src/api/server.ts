import { Hono } from "hono";
import { ServerConfig } from "@api/config.ts";
import { auth } from "@api/auth.ts";

const app = new Hono();

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
app.get("/", (c) => c.text("Hello, Deno!"));

Deno.serve({ port: ServerConfig.port }, app.fetch);
