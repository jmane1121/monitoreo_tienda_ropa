import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listMovements() {
  return prisma.inventarioMovimiento.findMany({ include: { producto: true, user: true } });
}

export async function createMovement({ tipo, cantidad, descripcion, productoId, userId }) {
  const movimiento = await prisma.inventarioMovimiento.create({
    data: { tipo, cantidad, descripcion, productoId, userId }
  });

  // actualizar stock en producto
  if (tipo === 'ENTRADA') {
    await prisma.producto.update({ where: { id: productoId }, data: { stock: { increment: cantidad } } });
  } else if (tipo === 'SALIDA') {
    await prisma.producto.update({ where: { id: productoId }, data: { stock: { decrement: cantidad } } });
  }

  return movimiento;
}
