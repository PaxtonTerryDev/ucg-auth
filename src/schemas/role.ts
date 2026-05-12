import { z } from "zod";

export const CreateRoleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const UpdateRoleSchema = CreateRoleSchema.partial();

export type CreateRole = z.infer<typeof CreateRoleSchema>;
export type UpdateRole = z.infer<typeof UpdateRoleSchema>;
