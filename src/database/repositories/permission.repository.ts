import { prisma } from "@database/prisma.ts";
import type { CreatePermission, UpdatePermission } from "@schemas/permission.ts";

export const permissionRepository = {
  async findAll(filters: { groupId?: string; resourceId?: string } = {}) {
    return prisma.permission.findMany({
      where: {
        resource: {
          groupId: filters.groupId,
          id: filters.resourceId,
        },
      },
      include: { action: true, resource: true },
      orderBy: { createdAt: "desc" },
    });
  },

  async findById(id: string) {
    return prisma.permission.findUnique({
      where: { id },
      include: { action: true, resource: { include: { group: true } } },
    });
  },

  async create(data: CreatePermission) {
    return prisma.permission.create({
      data,
      include: { action: true, resource: true },
    });
  },

  async update(id: string, data: UpdatePermission) {
    return prisma.permission.update({
      where: { id },
      data,
      include: { action: true, resource: true },
    });
  },

  async delete(id: string) {
    return prisma.permission.delete({ where: { id } });
  },

  async userHasPermission(userId: string, permissionId: string): Promise<boolean> {
    const result = await prisma.userRole.findFirst({
      where: {
        userId,
        role: {
          rolePermissions: { some: { permissionId } },
        },
      },
    });
    return result !== null;
  },
};
