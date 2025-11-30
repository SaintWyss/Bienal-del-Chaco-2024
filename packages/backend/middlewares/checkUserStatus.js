const { User } = require("../models");

const userCache = new Map(); // Cache temporal para almacenar información de usuarios

/**
 * Middleware para verificar el estado del usuario (activo y no expirado).
 * Primero verifica en el cache, si no está, consulta la base de datos.
 * Si el usuario es válido, permite continuar con la siguiente función.
 */
const checkUserStatus = async (req, res, next) => {
    try {
        const userId = req.user.id; // Obtener el ID del usuario desde el objeto `req.user`

        // Verificar si el usuario ya está en el cache
        if (userCache.has(userId)) {
            const cachedUser = userCache.get(userId); // Recuperar el usuario del cache

            // Verificar si el usuario está inactivo
            if (!cachedUser.isActive) {
                return res.status(403).json({ message: "Usuario inactivo" }); // Respuesta si el usuario está inactivo
            }

            // Verificar si el usuario ha expirado
            if (cachedUser.expiryDate && new Date() > new Date(cachedUser.expiryDate)) {
                return res.status(403).json({ message: "Usuario expirado" }); // Respuesta si el usuario ha expirado
            }

            // Si el usuario está activo y no ha expirado, continuar con el siguiente middleware
            return next();
        }

        // Si el usuario no está en el cache, buscarlo en la base de datos
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" }); // Respuesta si el usuario no existe en la base de datos
        }

        // Agregar al cache con un tiempo de vida limitado (60 segundos)
        userCache.set(userId, {
            isActive: user.isActive,
            expiryDate: user.expiryDate,
        });
        setTimeout(() => userCache.delete(userId), 60000); // Eliminar del cache después de 60 segundos

        // Verificar si el usuario está inactivo
        if (!user.isActive) {
            return res.status(403).json({ message: "Usuario inactivo" }); // Respuesta si el usuario está inactivo
        }

        // Verificar si el usuario ha expirado
        if (user.expiryDate && new Date() > new Date(user.expiryDate)) {
            return res.status(403).json({ message: "Usuario expirado" }); // Respuesta si el usuario ha expirado
        }

        // Si el usuario está activo y no ha expirado, continuar con el siguiente middleware
        next();
    } catch (error) {
        // Capturar cualquier error y devolver un mensaje de error interno del servidor
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = checkUserStatus;