import { prisma } from "@database/prisma.ts";
import type { CreateAction, UpdateAction } from "@schemas/action.ts";

export const actionRepository = {
  async findAll() {
    return prisma.action.findMany({ orderBy: { name: "asc" } });
  },

  async findById(id: string) {
    return prisma.action.findUnique({ where: { id } });
  },

  async create(data: CreateAction) {
    return prisma.action.create({
      data: { id: crypto.randomUUID(), ...data },
    });
  },

  async update(id: string, data: UpdateAction) {
    return prisma.action.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.action.delete({ where: { id } });
  },
};
