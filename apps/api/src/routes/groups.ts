import { Hono } from "hono";
import { groupRepository, roleRepository, resourceRepository } from "@ucg-auth/database/repositories";
import { UpdateGroupSchema } from "@ucg-auth/schemas/group";
import { CreateRoleSchema } from "@ucg-auth/schemas/role";
import { CreateResourceSchema } from "@ucg-auth/schemas/resource";
import { NotFoundError, ValidationError } from "../errors";

export const groupsRouter = new Hono();

groupsRouter.get("/:id", async (c) => {
  const group = await groupRepository.findById(c.req.param("id"));
  if (!group) throw new NotFoundError("Group not found");
  return c.json(group);
});

groupsRouter.patch("/:id", async (c) => {
  const group = await groupRepository.findById(c.req.param("id"));
  if (!group) throw new NotFoundError("Group not found");
  const parsed = UpdateGroupSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const updated = await groupRepository.update(c.req.param("id"), parsed.data);
  return c.json(updated);
});

groupsRouter.delete("/:id", async (c) => {
  const group = await groupRepository.findById(c.req.param("id"));
  if (!group) throw new NotFoundError("Group not found");
  await groupRepository.delete(c.req.param("id"));
  return c.body(null, 204);
});

groupsRouter.get("/:id/roles", async (c) => {
  const group = await groupRepository.findById(c.req.param("id"));
  if (!group) throw new NotFoundError("Group not found");
  const roles = await roleRepository.findByGroup(c.req.param("id"));
  return c.json(roles);
});

groupsRouter.post("/:id/roles", async (c) => {
  const group = await groupRepository.findById(c.req.param("id"));
  if (!group) throw new NotFoundError("Group not found");
  const parsed = CreateRoleSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const role = await roleRepository.create(c.req.param("id"), parsed.data);
  return c.json(role, 201);
});

groupsRouter.get("/:id/resources", async (c) => {
  const group = await groupRepository.findById(c.req.param("id"));
  if (!group) throw new NotFoundError("Group not found");
  const resources = await resourceRepository.findByGroup(c.req.param("id"));
  return c.json(resources);
});

groupsRouter.post("/:id/resources", async (c) => {
  const group = await groupRepository.findById(c.req.param("id"));
  if (!group) throw new NotFoundError("Group not found");
  const parsed = CreateResourceSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const resource = await resourceRepository.create(c.req.param("id"), parsed.data);
  return c.json(resource, 201);
});
