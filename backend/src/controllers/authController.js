import { PrismaCliente } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

const prisma = new PrismaCliente();

export const loginController = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({where: {email}});
        if (!user) return res.status(404).json({error: 'Usuario no encontrado'}); 

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) return res.status(401).json({error: 'Credenciales Incorrectad'});

        const token = jwt .sign({id: user.id, rol: user.rol}, process.env.JWT_SECRET, {
            expiresIn: '8h'
        });
        return res.json({token, user});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};