import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(){
    const password = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@tienda.com'},
        update:{},
        create:{
            nombre: 'Administrador',
            email: 'admin@tiedna.com',
            password,
            rol: 'ADMIN'
        }
    }); 

    console.log('Admin Creado: ', admin); 
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) =>{
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    }); 

    