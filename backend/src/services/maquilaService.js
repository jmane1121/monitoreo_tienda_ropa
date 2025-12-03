import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listMaquila() {
  return prisma.maquila.findMany({ include: { producto: true } });
}

export async function createMaquila(data) {
  return prisma.maquila.create({ data });
}

export async function updateMaquila(id, data) {
  return prisma.maquila.update({ where: { id: Number(id) }, data });
}
