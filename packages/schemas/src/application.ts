import { z } from "zod";

export const CreateApplicationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  repository: z.string().url(),
  description: z.string().optional(),
  oAuthClientId: z.string().min(1),
});

export const UpdateApplicationSchema = CreateApplicationSchema.partial();

export type CreateApplication = z.infer<typeof CreateApplicationSchema>;
export type UpdateApplication = z.infer<typeof UpdateApplicationSchema>;
