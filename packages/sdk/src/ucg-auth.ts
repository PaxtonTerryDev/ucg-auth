import { betterAuth, BetterAuthOptions } from "better-auth";
import { authClient } from "better-auth/client";
import process from "node:process";

export interface UCGAuthOptions extends BetterAuthOptions {}



export function UCGAuth(options: UCGAuthOptions) {
  const ba = betterAuth({ ...options });
  return ba
}

export function UCGAuthClient(options: )
