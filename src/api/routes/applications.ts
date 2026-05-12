import { Hono } from "hono";
import {
  applicationRepository,
  groupRepository,
} from "@database/repositories/index.ts";
import {
  CreateApplicationSchema,
  UpdateApplicationSchema,
} from "@schemas/application.ts";
import { CreateGroupSchema } from "@schemas/group.ts";
import { NotFoundError, ValidationError } from "@api/errors.ts";

export const applicationsRouter = new Hono();

applicationsRouter.get("/", async (c) => {
  const applications = await applicationRepository.findAll();
  return c.json(applications);
});

applicationsRouter.post("/", async (c) => {
  const parsed = CreateApplicationSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const application = await applicationRepository.create(parsed.data);
  return c.json(application, 201);
});

applicationsRouter.get("/:id", async (c) => {
  const application = await applicationRepository.findById(c.req.param("id"));
  if (!application) throw new NotFoundError("Application not found");
  return c.json(application);
});

applicationsRouter.patch("/:id", async (c) => {
  const application = await applicationRepository.findById(c.req.param("id"));
  if (!application) throw new NotFoundError("Application not found");
  const parsed = UpdateApplicationSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const updated = await applicationRepository.update(
    c.req.param("id"),
    parsed.data,
  );
  return c.json(updated);
});

applicationsRouter.delete("/:id", async (c) => {
  const application = await applicationRepository.findById(c.req.param("id"));
  if (!application) throw new NotFoundError("Application not found");
  await applicationRepository.delete(c.req.param("id"));
  return c.body(null, 204);
});

// NOTE: This gets all the available permissions for the application
applicationsRouter.get("/:id/schema", async (c) => {
  const schema = await applicationRepository.findSchema(c.req.param("id"));
  if (!schema) throw new NotFoundError("Application not found");
  return c.json(schema);
});

applicationsRouter.get("/:id/groups", async (c) => {
  const application = await applicationRepository.findById(c.req.param("id"));
  if (!application) throw new NotFoundError("Application not found");
  const groups = await groupRepository.findByApplication(c.req.param("id"));
  return c.json(groups);
});

applicationsRouter.post("/:id/groups", async (c) => {
  const application = await applicationRepository.findById(c.req.param("id"));
  if (!application) throw new NotFoundError("Application not found");
  const parsed = CreateGroupSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const group = await groupRepository.create(c.req.param("id"), parsed.data);
  return c.json(group, 201);
});
