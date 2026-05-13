import { Hono } from "hono";
import { userRepository, sessionContextRepository } from "@ucg-auth/database/repositories";
import { requireSession } from "../middleware/session";
import { ValidationError } from "../errors";

export const sessionRouter = new Hono();

sessionRouter.get("/", requireSession, async (c) => {
  const appId = c.req.query("appId");
  if (!appId) throw new ValidationError([{ message: "appId query parameter is required", path: ["appId"], code: "custom" }]);

  const { user, session } = c.get("session");

  const userRoles = await userRepository.findRoles(user.id, appId);

  const roleIds = userRoles.map((ur) => ur.roleId);
  const sessionContext = await sessionContextRepository.upsert(session.id, appId, user.id, roleIds);

  const roles = userRoles.map((ur) => ({
    id: ur.role.id,
    name: ur.role.name,
    description: ur.role.description,
    permissions: ur.role.rolePermissions.map((rp) => ({
      id: rp.permission.id,
      action: rp.permission.action.name,
      resource: rp.permission.resource.name,
      audited: rp.permission.audited,
    })),
  }));

  return c.json({
    user: { id: user.id, email: user.email, name: user.name },
    sessionContext: { id: sessionContext.id, sessionId: sessionContext.sessionId, applicationId: sessionContext.applicationId },
    roles,
  });
});
