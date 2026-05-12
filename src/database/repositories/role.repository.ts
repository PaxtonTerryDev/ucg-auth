import { prisma } from "@database/prisma.ts";
import type { CreateRole, UpdateRole } from "@schemas/role.ts";

export const roleRepository = {
  async findById(id: string) {
    return prisma.role.findUnique({ where: { id } });
  },

  async findByGroup(groupId: string) {
    return prisma.role.findMany({
      where: { groupId },
      orderBy: { createdAt: "desc" },
    });
  },

  async create(groupId: string, data: CreateRole) {
    return prisma.role.create({
      data: { id: crypto.randomUUID(), groupId, ...data },
    });
  },

  async update(id: string, data: UpdateRole) {
    return prisma.role.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.role.delete({ where: { id } });
  },

  async findPermissions(id: string) {
    return prisma.rolePermission.findMany({
      where: { roleId: id },
      include: { permission: { include: { action: true, resource: true } } },
    });
  },

  async assignPermission(roleId: string, permissionId: string) {
    return prisma.rolePermission.create({
      data: { roleId, permissionId },
    });
  },

  async removePermission(roleId: string, permissionId: string) {
    return prisma.rolePermission.delete({
      where: { roleId_permissionId: { roleId, permissionId } },
    });
  },
};
