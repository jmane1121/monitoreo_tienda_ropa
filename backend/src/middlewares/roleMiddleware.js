export function requireRole(role) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'No autorizado' });
    // si es ADMIN acepta cualquier cosa
    if (user.rol !== role && user.rol !== 'ADMIN') return res.status(403).json({ error: 'Permiso denegado' });
    next();
  };
}
