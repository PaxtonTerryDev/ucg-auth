import type { Context } from "hono";
import { AppError } from "@api/errors.ts";
import * as log from "@lib/log.ts";

export function errorHandler(err: Error, c: Context) {
  if (err instanceof AppError) {
    return c.json(
      { error: { code: err.code, message: err.message, details: err.details } },
      err.status as Parameters<typeof c.json>[1],
    );
  }

  log.error("Unhandled error", { message: err.message, stack: err.stack });

  return c.json(
    { error: { code: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred" } },
    500,
  );
}
