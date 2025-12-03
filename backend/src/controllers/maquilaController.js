import * as service from '../services/maquilaService.js';
import { validateMaquila } from '../validations/maquilaValidation.js';

export const crearMaquila = async (req, res) => {
  try {
    const errors = validateMaquila(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const registro = await service.createMaquila(req.body);
    res.status(201).json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarMaquila = async (req, res) => {
  try {
    const data = await service.listMaquila();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarMaquila = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await service.updateMaquila(id, req.body);
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
