export function validateMaquila(body) {
  const { userId, productoId, cantidad, precioUnitario, fechaCorte } = body;
  const errors = [];

  if (!userId || isNaN(userId)) errors.push("userId inválido");
  if (!productoId || isNaN(productoId)) errors.push("productoId inválido");

  if (!cantidad || isNaN(cantidad) || cantidad <= 0)
    errors.push("cantidad inválida");

  if (precioUnitario == null || isNaN(precioUnitario))
    errors.push("precioUnitario inválido");

  if (!fechaCorte) errors.push("fechaCorte es requerida");

  return errors;
}
