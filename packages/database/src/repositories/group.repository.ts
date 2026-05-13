import { prisma } from "../prisma";
import type { CreateGroup, UpdateGroup } from "@ucg-auth/schemas/group";

export const groupRepository = {
  async findById(id: string) {
    return prisma.group.findUnique({ where: { id } });
  },

  async findByApplication(applicationId: string) {
    return prisma.group.findMany({
      where: { applicationId },
      orderBy: { createdAt: "desc" },
    });
  },

  async create(applicationId: string, data: CreateGroup) {
    return prisma.group.create({
      data: { id: crypto.randomUUID(), applicationId, ...data },
    });
  },

  async update(id: string, data: UpdateGroup) {
    return prisma.group.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.group.delete({ where: { id } });
  },
};
