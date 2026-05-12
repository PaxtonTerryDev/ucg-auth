import { createMiddleware } from "hono/factory";
import { auth } from "@api/auth.ts";
import { UnauthorizedError } from "@api/errors.ts";

type SessionUser = Awaited<ReturnType<typeof auth.api.getSession>>

declare module "hono" {
  interface ContextVariableMap {
    session: NonNullable<SessionUser>;
  }
}

export const requireSession = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    throw new UnauthorizedError();
  }

  c.set("session", session);
  await next();
});
