import { Hono } from "hono";
import { actionRepository } from "@ucg-auth/database/repositories";
import { CreateActionSchema, UpdateActionSchema } from "@ucg-auth/schemas/action";
import { NotFoundError, ValidationError } from "../errors";

export const actionsRouter = new Hono();

actionsRouter.get("/", async (c) => {
  const actions = await actionRepository.findAll();
  return c.json(actions);
});

actionsRouter.post("/", async (c) => {
  const parsed = CreateActionSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const action = await actionRepository.create(parsed.data);
  return c.json(action, 201);
});

actionsRouter.get("/:id", async (c) => {
  const action = await actionRepository.findById(c.req.param("id"));
  if (!action) throw new NotFoundError("Action not found");
  return c.json(action);
});

actionsRouter.patch("/:id", async (c) => {
  const action = await actionRepository.findById(c.req.param("id"));
  if (!action) throw new NotFoundError("Action not found");
  const parsed = UpdateActionSchema.safeParse(await c.req.json());
  if (!parsed.success) throw new ValidationError(parsed.error.issues);
  const updated = await actionRepository.update(c.req.param("id"), parsed.data);
  return c.json(updated);
});

actionsRouter.delete("/:id", async (c) => {
  const action = await actionRepository.findById(c.req.param("id"));
  if (!action) throw new NotFoundError("Action not found");
  await actionRepository.delete(c.req.param("id"));
  return c.body(null, 204);
});
