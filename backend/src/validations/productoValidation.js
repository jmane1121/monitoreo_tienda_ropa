export function validateCreateProduct(body) {
  const { nombre, modelo, color, talla, precio, stock } = body;
  const errors = [];

  if (!nombre) errors.push("nombre es requerido");
  if (!modelo) errors.push("modelo es requerido");
  if (!color) errors.push("color es requerido");
  if (!talla) errors.push("talla es requerida");
  if (precio == null || isNaN(precio)) errors.push("precio inválido");
  if (stock == null || isNaN(stock)) errors.push("stock inválido");

  return errors;
}

export function validateUpdateProduct(body) {
  const allowed = ["nombre", "modelo", "color", "talla", "precio", "stock"];
  const errors = [];

  Object.keys(body).forEach((key) => {
    if (!allowed.includes(key)) {
      errors.push(`campo no permitido: ${key}`);
    }
  });

  return errors;
}
