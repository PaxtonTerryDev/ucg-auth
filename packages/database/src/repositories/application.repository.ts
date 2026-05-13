import { prisma } from "../prisma";
import type { CreateApplication, UpdateApplication } from "@ucg-auth/schemas/application";

export const applicationRepository = {
  async findAll() {
    return prisma.application.findMany({ orderBy: { createdAt: "desc" } });
  },

  async findById(id: string) {
    return prisma.application.findUnique({ where: { id } });
  },

  async create(data: CreateApplication) {
    return prisma.application.create({
      data: { id: crypto.randomUUID(), ...data },
    });
  },

  async update(id: string, data: UpdateApplication) {
    return prisma.application.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.application.delete({ where: { id } });
  },

  async findSchema(id: string) {
    return prisma.application.findUnique({
      where: { id },
      include: {
        groups: {
          include: {
            roles: {
              include: {
                rolePermissions: {
                  include: {
                    permission: {
                      include: { action: true, resource: true },
                    },
                  },
                },
              },
            },
            resources: true,
          },
        },
      },
    });
  },
};
