import { z } from "zod";

export const CreateAuditEntrySchema = z.object({
  permissionId: z.string().min(1),
  resourceInstanceId: z.string().optional(),
});

export type CreateAuditEntry = z.infer<typeof CreateAuditEntrySchema>;
