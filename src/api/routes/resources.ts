import { Hono } from "hono";
import { resourceRepository } from "@database/repositories/index.ts";
import { UpdateResourceSchema, CreateResourceInstanceSchema } from "@schemas/resource.ts";
import { NotFoundError, ValidationError } from "@api/errors.ts";

export const resourcesRouter = new Hono();

resourcesRouter.get("/:id", async (c) => {
  const resource = await resourceRepository.findById(c.req.param("id"));
  if (!resource) throw new NotFoundError("Resource not found");
  return c.json(resource);
});

resourcesRouter.patch("/:id", async (c) => {
  const resource = await resourceRepository.findById(c.req.param("id"));
  if (!resource) throw new NotFoundError("Resource not found");
  const parsed = UpdateResourceSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const updated = await resourceRepository.update(c.req.param("id"), parsed.data);
  return c.json(updated);
});

resourcesRouter.delete("/:id", async (c) => {
  const resource = await resourceRepository.findById(c.req.param("id"));
  if (!resource) throw new NotFoundError("Resource not found");
  await resourceRepository.delete(c.req.param("id"));
  return c.body(null, 204);
});

resourcesRouter.get("/:id/instances", async (c) => {
  const resource = await resourceRepository.findById(c.req.param("id"));
  if (!resource) throw new NotFoundError("Resource not found");
  const instances = await resourceRepository.findInstances(c.req.param("id"));
  return c.json(instances);
});

resourcesRouter.post("/:id/instances", async (c) => {
  const resource = await resourceRepository.findById(c.req.param("id"));
  if (!resource) throw new NotFoundError("Resource not found");
  const parsed = CreateResourceInstanceSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const instance = await resourceRepository.upsertInstance(c.req.param("id"), parsed.data);
  return c.json(instance, 201);
});

resourcesRouter.get("/:id/instances/:instanceId", async (c) => {
  const resource = await resourceRepository.findById(c.req.param("id"));
  if (!resource) throw new NotFoundError("Resource not found");
  const instance = await resourceRepository.findInstanceById(c.req.param("instanceId"));
  if (!instance || instance.resourceId !== c.req.param("id")) {
    throw new NotFoundError("Resource instance not found");
  }
  return c.json(instance);
});
