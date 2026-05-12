import { Hono } from "hono";
import { userRepository } from "@database/repositories/index.ts";
import { AssignRoleSchema } from "@schemas/user.ts";
import { ValidationError, ConflictError } from "@api/errors.ts";

export const usersRouter = new Hono();

usersRouter.get("/:id/roles", async (c) => {
  const appId = c.req.query("appId");
  const roles = await userRepository.findRoles(c.req.param("id"), appId);
  return c.json(roles);
});

usersRouter.post("/:id/roles", async (c) => {
  const parsed = AssignRoleSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  try {
    const assignment = await userRepository.assignRole(c.req.param("id"), parsed.data.roleId);
    return c.json(assignment, 201);
  } catch {
    throw new ConflictError("Role already assigned to this user");
  }
});

usersRouter.delete("/:id/roles/:roleId", async (c) => {
  await userRepository.removeRole(c.req.param("id"), c.req.param("roleId"));
  return c.body(null, 204);
});
