import { prisma } from "@database/prisma.ts";

export const userRepository = {
  async findRoles(userId: string, appId?: string) {
    return prisma.userRole.findMany({
      where: {
        userId,
        role: appId
          ? { group: { applicationId: appId } }
          : undefined,
      },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: { include: { action: true, resource: true } },
              },
            },
          },
        },
      },
    });
  },

  async assignRole(userId: string, roleId: string) {
    return prisma.userRole.create({ data: { userId, roleId } });
  },

  async removeRole(userId: string, roleId: string) {
    return prisma.userRole.delete({
      where: { userId_roleId: { userId, roleId } },
    });
  },
};
