import { PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export async function createUser({nombre, email, password, rol ='EMPLEADO'}){
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { nombre, email, password: hashed, rol}
    });
    return user;
}

export async function getUsers(){
    return prisma.user.findMany({
        select: {id: true, nombre: true, email: true, rol: true, activo: true, createdAt: true}
    });
}

export async function getUserByEmail(email){
    return prisma.user.findUnique({where: {email}});
}

export async function getUserById(id){
    return prisma.user.findUnique({where: {id: Number(id)}});
}

export async function updateUser(id, data) {
    if(data.password){
        data.password = await bcrypt.hash(data.password, 10);
    }
    return prisma.user.update({where: {id: Number(id)}});
}

export async function deleteUser(id){
    return prisma.user.delete({where: {id: Number(id)}});
}