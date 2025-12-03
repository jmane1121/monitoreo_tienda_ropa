import * as userService from '../services/user.service.js';

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ error: 'Campos requeridos' });

    const existing = await userService.getUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'El email ya está registrado' });

    const user = await userService.createUser({ nombre, email, password, rol });
    const safe = { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol };
    res.status(201).json(safe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ id: user.id, nombre: user.nombre, email: user.email, rol: user.rol, activo: user.activo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    delete data.id; // por seguridad
    const updated = await userService.updateUser(Number(id), data);
    res.json({ id: updated.id, nombre: updated.nombre, email: updated.email, rol: updated.rol, activo: updated.activo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(Number(id));
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
