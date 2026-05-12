import { z } from "zod";

export const CreateActionSchema = z.object({
  name: z.string().min(1),
});

export const UpdateActionSchema = CreateActionSchema.partial();

export type CreateAction = z.infer<typeof CreateActionSchema>;
export type UpdateAction = z.infer<typeof UpdateActionSchema>;
