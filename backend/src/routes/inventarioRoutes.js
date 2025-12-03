import { Router } from 'express';
import { verificarToken } from '../middleware/auth.js';
import * as controller from '../controllers/inventarioController.js';


const router = Router();


router.get('/', verificarToken, controller.obtenerMovimientos);
router.post('/', verificarToken, controller.registrarMovimiento);


export default router;