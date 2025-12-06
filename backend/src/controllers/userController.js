import * as userService from '../services/userService.js';

import prisma from "../config/prismaClient.js";
import bcryptjs from 'bcryptjs';

// 📌 Obtener todos los usuarios (solo ADMIN)
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return res.json({
      ok: true,
      users
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Error al obtener usuarios" });
  }
};

// 📌 Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    }

    return res.json({ ok: true, user });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Error al obtener usuario" });
  }
};

// 📌 Crear usuario (solo ADMIN)
export const createUser = async (req, res) => {
  try {
    const { nombre, email, password, role } = req.body;

    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
      return res.status(409).json({ ok: false, msg: "El email ya existe" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashed,
        role: role || "USER"
      }
    });

    return res.json({ ok: true, msg: "Usuario creado", newUser });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Error al crear usuario" });
  }
};

// 📌 Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { nombre, email, role } = req.body;

    const updated = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { nombre, email, role }
    });

    return res.json({ ok: true, msg: "Usuario actualizado", updated });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Error al actualizar usuario" });
  }
};

// 📌 Cambiar contraseña
export const changePassword = async (req, res) => {
  try {
    const { password } = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(password, salt);

    await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { password: hashed }
    });

    return res.json({
      ok: true,
      msg: "Contraseña actualizada correctamente"
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Error al cambiar contraseña" });
  }
};

// 📌 Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });

    return res.json({ ok: true, msg: "Usuario eliminado" });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Error al eliminar usuario" });
  }
};
