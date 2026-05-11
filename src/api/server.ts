import { Hono } from "hono";
import { ServerConfig } from "@api/config.ts";
import { auth } from "@api/auth.ts";

const app = new Hono();
app.get("/", (c) => c.text("Hello, Deno!"));

const api = new Hono();
api.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

app.route("api", api);
Deno.serve({ port: ServerConfig.port }, app.fetch);
