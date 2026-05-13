import { Hono } from "hono";
import { errorHandler } from "../middleware/error";
import { applicationsRouter } from "./applications";
import { groupsRouter } from "./groups";
import { rolesRouter } from "./roles";
import { resourcesRouter } from "./resources";
import { actionsRouter } from "./actions";
import { permissionsRouter } from "./permissions";
import { usersRouter } from "./users";
import { sessionRouter } from "./session";
import { auditRouter } from "./audit";

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
