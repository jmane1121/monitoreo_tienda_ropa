import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listProducts() {
  return prisma.producto.findMany();
}

export async function createProduct(data) {
  return prisma.producto.create({ data });
}

export async function updateProduct(id, data) {
  return prisma.producto.update({ where: { id: Number(id) }, data });
}

export async function deleteProduct(id) {
  return prisma.producto.delete({ where: { id: Number(id) } });
}
