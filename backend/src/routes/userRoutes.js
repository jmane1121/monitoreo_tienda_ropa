import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import * as controller from '../controllers/user.controller.js';

const router = Router();

router.post('/', verificarToken, controller.crearUsuario);
router.get('/', verificarToken, controller.listarUsuarios);
router.get('/:id', verificarToken, controller.obtenerUsuario);
router.put('/:id', verificarToken, controller.actualizarUsuario);
router.delete('/:id', verificarToken, controller.eliminarUsuario);

export default router;