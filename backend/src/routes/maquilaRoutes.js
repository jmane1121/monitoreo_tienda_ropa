import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import * as controller from '../controllers/maquilaController.js';


const router = Router();


router.get('/', verificarToken, controller.obtenerMaquila);
router.post('/', verificarToken, controller.crearMaquila);
router.put('/:id', verificarToken, controller.actualizarMaquila);


export default router;