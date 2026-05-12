import { Hono } from "hono";
import { roleRepository } from "@database/repositories/index.ts";
import { UpdateRoleSchema } from "@schemas/role.ts";
import { AssignPermissionSchema } from "@schemas/permission.ts";
import { NotFoundError, ValidationError, ConflictError } from "@api/errors.ts";

export const rolesRouter = new Hono();

rolesRouter.get("/:id", async (c) => {
  const role = await roleRepository.findById(c.req.param("id"));
  if (!role) throw new NotFoundError("Role not found");
  return c.json(role);
});

rolesRouter.patch("/:id", async (c) => {
  const role = await roleRepository.findById(c.req.param("id"));
  if (!role) throw new NotFoundError("Role not found");
  const parsed = UpdateRoleSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const updated = await roleRepository.update(c.req.param("id"), parsed.data);
  return c.json(updated);
});

rolesRouter.delete("/:id", async (c) => {
  const role = await roleRepository.findById(c.req.param("id"));
  if (!role) throw new NotFoundError("Role not found");
  await roleRepository.delete(c.req.param("id"));
  return c.body(null, 204);
});

rolesRouter.get("/:id/permissions", async (c) => {
  const role = await roleRepository.findById(c.req.param("id"));
  if (!role) throw new NotFoundError("Role not found");
  const permissions = await roleRepository.findPermissions(c.req.param("id"));
  return c.json(permissions);
});

rolesRouter.post("/:id/permissions", async (c) => {
  const role = await roleRepository.findById(c.req.param("id"));
  if (!role) throw new NotFoundError("Role not found");
  const parsed = AssignPermissionSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  try {
    const assignment = await roleRepository.assignPermission(c.req.param("id"), parsed.data.permissionId);
    return c.json(assignment, 201);
  } catch {
    throw new ConflictError("Permission already assigned to this role");
  }
});

rolesRouter.delete("/:id/permissions/:permissionId", async (c) => {
  const role = await roleRepository.findById(c.req.param("id"));
  if (!role) throw new NotFoundError("Role not found");
  await roleRepository.removePermission(c.req.param("id"), c.req.param("permissionId"));
  return c.body(null, 204);
});
