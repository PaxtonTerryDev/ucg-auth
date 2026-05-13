import { z } from "zod";

export const CreateResourceSchema = z.object({
  name: z.string().min(1),
});

export const UpdateResourceSchema = CreateResourceSchema.partial();

export const CreateResourceInstanceSchema = z.object({
  externalId: z.string().optional(),
  label: z.string().optional(),
});

export const UpdateResourceInstanceSchema = CreateResourceInstanceSchema.partial();

export type CreateResource = z.infer<typeof CreateResourceSchema>;
export type UpdateResource = z.infer<typeof UpdateResourceSchema>;
export type CreateResourceInstance = z.infer<typeof CreateResourceInstanceSchema>;
export type UpdateResourceInstance = z.infer<typeof UpdateResourceInstanceSchema>;
