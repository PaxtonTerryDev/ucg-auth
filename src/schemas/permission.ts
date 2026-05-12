import { z } from "zod";

export const CreatePermissionSchema = z.object({
  actionId: z.string().min(1),
  resourceId: z.string().min(1),
  audited: z.boolean().optional().default(false),
});

export const UpdatePermissionSchema = z.object({
  audited: z.boolean(),
});

export const AssignPermissionSchema = z.object({
  permissionId: z.string().min(1),
});

export type CreatePermission = z.infer<typeof CreatePermissionSchema>;
export type UpdatePermission = z.infer<typeof UpdatePermissionSchema>;
export type AssignPermission = z.infer<typeof AssignPermissionSchema>;
