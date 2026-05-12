import { Hono } from "hono";
import { errorHandler } from "@api/middleware/error.ts";
import { applicationsRouter } from "./applications.ts";
import { groupsRouter } from "./groups.ts";
import { rolesRouter } from "./roles.ts";
import { resourcesRouter } from "./resources.ts";
import { actionsRouter } from "./actions.ts";
import { permissionsRouter } from "./permissions.ts";
import { usersRouter } from "./users.ts";
import { sessionRouter } from "./session.ts";
import { auditRouter } from "./audit.ts";

export const v1 = new Hono();

v1.onError(errorHandler);

v1.route("/applications", applicationsRouter);
v1.route("/groups", groupsRouter);
v1.route("/roles", rolesRouter);
v1.route("/resources", resourcesRouter);
v1.route("/actions", actionsRouter);
v1.route("/permissions", permissionsRouter);
v1.route("/users", usersRouter);
v1.route("/session", sessionRouter);
v1.route("/audit", auditRouter);
