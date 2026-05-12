import { Hono } from "hono";
import { ServerConfig } from "@api/config.ts";
import { auth } from "@api/auth.ts";
import { views } from "@api/views/router.tsx";
import { v1 } from "@api/routes/index.ts";
import {
  oauthProviderAuthServerMetadata,
  oauthProviderOpenIdConfigMetadata,
} from "@better-auth/oauth-provider";

const app = new Hono();

const api = new Hono();

api.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

api.route("/v1", v1);

app.route("/api", api);

app.route("/", views);

app.get(
  "/.well-known/openid-configuration",
  (c) => oauthProviderOpenIdConfigMetadata(auth)(c.req.raw),
);

app.get(
  "/.well-known/oauth-authorization-server",
  (c) => oauthProviderAuthServerMetadata(auth)(c.req.raw),
);

Deno.serve({ port: ServerConfig.port }, app.fetch);
