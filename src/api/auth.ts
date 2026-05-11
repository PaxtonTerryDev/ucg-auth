import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@database/prisma.ts";
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
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    jwt(),
    oauthProvider({
      loginPage: "/sign-in",
      consentPage: "/consent",
    }),
  ],
});
