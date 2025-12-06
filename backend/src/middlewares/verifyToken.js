import jwt from "jsonwebtoken";

// Middleware para verificar token
export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guarda el usuario en la request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

// Middleware para restringir por roles
export const roleRequired = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    };
};
