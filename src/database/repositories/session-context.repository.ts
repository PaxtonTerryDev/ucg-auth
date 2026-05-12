import { prisma } from "@database/prisma.ts";

export const sessionContextRepository = {
  async upsert(sessionId: string, applicationId: string, userId: string, roleIds: string[]) {
    return prisma.$transaction(async (tx) => {
      const context = await tx.sessionContext.upsert({
        where: { sessionId },
        create: { id: crypto.randomUUID(), sessionId, applicationId, userId },
        update: { applicationId },
      });

      await tx.sessionRole.deleteMany({ where: { sessionContextId: context.id } });

      if (roleIds.length > 0) {
        await tx.sessionRole.createMany({
          data: roleIds.map((roleId) => ({ sessionContextId: context.id, roleId })),
        });
      }

      return context;
    });
  },
};
