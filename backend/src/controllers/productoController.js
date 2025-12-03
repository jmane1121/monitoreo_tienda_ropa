import * as service from '../services/productoService.js';
import { validateCreateProduct, validateUpdateProduct } from '../validations/productoValidation.js';

export const crearProducto = async (req, res) => {
  try {
    const errors = validateCreateProduct(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const producto = await service.createProduct(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarProductos = async (req, res) => {
  try {
    const productos = await service.listProducts();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const errors = validateUpdateProduct(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { id } = req.params;
    const updated = await service.updateProduct(id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteProduct(id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
