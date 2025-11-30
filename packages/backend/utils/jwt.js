const jwt = require("jsonwebtoken");

/**
 * Genera un token JWT para el usuario.
 * @param {Object} user - El objeto del usuario para el que se generará el token.
 * @returns {string} - El token JWT generado.
 */
const generateToken = (user) => {
    // Firmamos el token con el id, nombre de usuario y rol del usuario
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET, // Se utiliza la clave secreta del entorno para firmar el token
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h", // Tiempo de expiración del token (default 1 hora)
        }
    );
};

module.exports = { generateToken };