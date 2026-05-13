import { prisma } from "../prisma";

interface CreateAuditLogParams {
  userId: string;
  sessionId?: string;
  applicationId: string;
  permissionId: string;
  resourceInstanceId?: string;
  allowed: boolean;
  ipAddress?: string;
  userAgent?: string;
}

export const auditLogRepository = {
  async create(params: CreateAuditLogParams) {
    return prisma.auditLog.create({
      data: { id: crypto.randomUUID(), ...params },
    });
  },
};
