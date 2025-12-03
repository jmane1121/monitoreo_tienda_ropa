export function validateInventoryMovement(body) {
  const { tipo, cantidad, productoId } = body;
  const errors = [];

  if (!tipo || !["ENTRADA", "SALIDA"].includes(tipo))
    errors.push("tipo debe ser ENTRADA o SALIDA");

  if (!cantidad || isNaN(cantidad) || cantidad <= 0)
    errors.push("cantidad inválida");

  if (!productoId || isNaN(productoId))
    errors.push("productoId inválido");

  return errors;
}
