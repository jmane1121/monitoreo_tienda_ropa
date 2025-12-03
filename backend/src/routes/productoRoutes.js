import { Router } from 'express'; 
import { verificarToken } from '../middlewares/authMiddleware';
import * as controller from '../controllers/productoController.js';

const router = Router();
router.get('/', verificarToken, controller.obtenerProductos);
router.post('/', verificarToken, controller.crearProducto);
router.put('/:id', verificarToken, controller.actualizarProducto);
router.delete('/:id', verificarToken, controller.eliminarProducto);


export default router;