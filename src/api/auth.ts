import { betterAuth, jwt } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../database/prisma.ts"; // Can't use aliased imports -> breaks auth cli
import { ServerConfig } from "./config.ts";
import { oauthProvider } from "@better-auth/oauth-provider";

export const auth = betterAuth({
  baseURL: ServerConfig.baseURL,
  disabledPaths: [
    "/token",
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    jwt(),
    oauthProvider({
      loginPage: "",
    }),
  ],
});
