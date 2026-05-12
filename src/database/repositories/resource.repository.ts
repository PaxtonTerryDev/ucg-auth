import { prisma } from "@database/prisma.ts";
import type { CreateResource, UpdateResource, CreateResourceInstance } from "@schemas/resource.ts";

export const resourceRepository = {
  async findById(id: string) {
    return prisma.resource.findUnique({ where: { id } });
  },

  async findByGroup(groupId: string) {
    return prisma.resource.findMany({
      where: { groupId },
      orderBy: { createdAt: "desc" },
    });
  },

  async create(groupId: string, data: CreateResource) {
    return prisma.resource.create({
      data: { id: crypto.randomUUID(), groupId, ...data },
    });
  },

  async update(id: string, data: UpdateResource) {
    return prisma.resource.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.resource.delete({ where: { id } });
  },

  async findInstances(resourceId: string) {
    return prisma.resourceInstance.findMany({
      where: { resourceId },
      orderBy: { createdAt: "desc" },
    });
  },

  async findInstanceById(instanceId: string) {
    return prisma.resourceInstance.findUnique({ where: { id: instanceId } });
  },

  async upsertInstance(resourceId: string, data: CreateResourceInstance) {
    if (data.externalId) {
      return prisma.resourceInstance.upsert({
        where: { resourceId_externalId: { resourceId, externalId: data.externalId } },
        create: { id: crypto.randomUUID(), resourceId, ...data },
        update: { label: data.label },
      });
    }
    return prisma.resourceInstance.create({
      data: { id: crypto.randomUUID(), resourceId, ...data },
    });
  },
};
