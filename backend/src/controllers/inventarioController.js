import * as service from '../services/inventarioService.js';
import { validateInventoryMovement } from '../validations/inventarioValidation.js';

export const crearMovimiento = async (req, res) => {
  try {
    const errors = validateInventoryMovement(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const movimiento = await service.createMovement({ 
      ...req.body,
      userId: req.user.id 
    });

    res.status(201).json(movimiento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarMovimientos = async (req, res) => {
  try {
    const movimientos = await service.listMovements();
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
