import { PrismaClient } from '@prisma/client';
import prisma from "../config/prismaClient.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { verifyToken } from '../middlewares/verifyToken.js';
import { roleRequired} from '../middlewares/verifyToken.js';

//const prisma = new PrismaClient();

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
      },
    });

    return res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error obteniendo perfil",
    });
  }
};


// 🔐 LOGIN DEL USUARIO
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        msg: "Email y contraseña obligatorios",
      });
    }

    // Buscar usuario en BD
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    // Comparar contraseña
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    // Generar token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      ok: true,
      msg: "Login correcto",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      ok: false,
      msg: "Error interno al iniciar sesión",
    });
  }
};

// 🔐 REGISTRO DE USUARIO
export const registerUser = async (req, res) => {
  try {
    const { nombre, email, password, role } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        ok: false,
        msg: "Nombre, email y contraseña son obligatorios",
      });
    }

    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      return res.status(409).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }

    // Encriptar contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(password, salt);

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashed,
        role: role || "USER",
      },
    });

    // Generar token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      ok: true,
      msg: "Usuario registrado",
      token,
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno al registrar usuario",
    });
  }
};