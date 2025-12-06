export const roleProtected = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        ok: false,
        msg: "No tienes permisos para acceder a esta acción",
      });
    }

    next();
  };
};
