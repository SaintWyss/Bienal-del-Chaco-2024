// Middleware para verificar si el usuario tiene el rol necesario
const roleMiddleware = (requiredRole) => (req, res, next) => {
    // Verificamos si el rol del usuario en la solicitud es diferente al rol requerido
    if (req.user.role !== requiredRole) {
        // Si el rol no coincide, respondemos con un error 403 (acceso denegado)
        return res.status(403).json({ message: "Acceso denegado. Rol insuficiente." });
    }
    // Si el rol es el correcto, pasamos al siguiente middleware o controlador
    next();
};

// Exportamos el middleware para su uso en otras partes de la aplicación
module.exports = roleMiddleware;