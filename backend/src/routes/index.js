import { Router } from "express";
import authRoutes from './authRoutes';
import productosRoutes from './productoRoutes';
import movimientosRoutes from './inventarioRoutes';
import maquilaRoutes from './maquilaRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/productos', productosRoutes);
router.use('/movimientos', movimientosRoutes);
router.use('/maquila', maquilaRoutes); 
router.use('/users', userRoutes);

export default router;