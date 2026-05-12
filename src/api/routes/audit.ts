import { Hono } from "hono";
import { permissionRepository, auditLogRepository } from "@database/repositories/index.ts";
import { CreateAuditEntrySchema } from "@schemas/audit.ts";
import { requireSession } from "@api/middleware/session.ts";
import { NotFoundError, ValidationError } from "@api/errors.ts";

export const auditRouter = new Hono();

auditRouter.post("/", requireSession, async (c) => {
  const parsed = CreateAuditEntrySchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);

  const { user, session } = c.get("session");
  const { permissionId, resourceInstanceId } = parsed.data;

  const permission = await permissionRepository.findById(permissionId);
  if (!permission) throw new NotFoundError("Permission not found");

  const allowed = await permissionRepository.userHasPermission(user.id, permissionId);

  const applicationId = permission.resource.group.applicationId;

  await auditLogRepository.create({
    userId: user.id,
    sessionId: session.id,
    applicationId,
    permissionId,
    resourceInstanceId,
    allowed,
    ipAddress: c.req.header("x-forwarded-for") ?? c.req.header("remote-addr"),
    userAgent: c.req.header("user-agent"),
  });

  return c.json({ allowed }, allowed ? 200 : 403);
});
