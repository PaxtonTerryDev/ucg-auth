import { Hono } from "hono";
import { permissionRepository } from "@ucg-auth/database/repositories";
import { CreatePermissionSchema, UpdatePermissionSchema } from "@ucg-auth/schemas/permission";
import { NotFoundError, ValidationError } from "../errors";

export const permissionsRouter = new Hono();

permissionsRouter.get("/", async (c) => {
  const groupId = c.req.query("groupId");
  const resourceId = c.req.query("resourceId");
  const permissions = await permissionRepository.findAll({ groupId, resourceId });
  return c.json(permissions);
});

permissionsRouter.post("/", async (c) => {
  const parsed = CreatePermissionSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const permission = await permissionRepository.create(parsed.data);
  return c.json(permission, 201);
});

permissionsRouter.get("/:id", async (c) => {
  const permission = await permissionRepository.findById(c.req.param("id"));
  if (!permission) throw new NotFoundError("Permission not found");
  return c.json(permission);
});

permissionsRouter.patch("/:id", async (c) => {
  const permission = await permissionRepository.findById(c.req.param("id"));
  if (!permission) throw new NotFoundError("Permission not found");
  const parsed = UpdatePermissionSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const updated = await permissionRepository.update(c.req.param("id"), parsed.data);
  return c.json(updated);
});

permissionsRouter.delete("/:id", async (c) => {
  const permission = await permissionRepository.findById(c.req.param("id"));
  if (!permission) throw new NotFoundError("Permission not found");
  await permissionRepository.delete(c.req.param("id"));
  return c.body(null, 204);
});
