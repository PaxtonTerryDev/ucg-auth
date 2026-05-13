import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { ServerConfig } from "./config";
import { auth } from "./auth";
import { views } from "./views/router";
import { v1 } from "./routes/index";
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

serve({ port: ServerConfig.port, fetch: app.fetch });
