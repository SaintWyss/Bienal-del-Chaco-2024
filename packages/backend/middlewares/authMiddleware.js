// Requiere el paquete `jsonwebtoken` para manejar los tokens JWT.
const jwt = require("jsonwebtoken");

// Middleware para autenticar el token JWT en las solicitudes.
const authenticateToken = (req, res, next) => {
    try {
        // Obtiene el encabezado de autorización de la solicitud.
        const authHeader = req.headers.authorization;

        // Verifica si el encabezado de autorización existe y comienza con "Bearer ".
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            // Si el token no está presente o es inválido, responde con error 401.
            return res.status(401).json({ message: "Token faltante o inválido" });
        }

        // Extrae el token de la cadena "Bearer <token>".
        const token = authHeader.split(" ")[1];

        // Verifica y decodifica el token usando la clave secreta definida en las variables de entorno.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Almacena los datos del usuario decodificados en `req.user` para su uso posterior en otros middlewares o rutas.
        req.user = decoded;

        // Llama al siguiente middleware en la cadena de ejecución.
        next();
    } catch (error) {
        // Maneja errores relacionados con el token.
        if (error.name === "TokenExpiredError") {
            // Si el token ha expirado, responde con un mensaje adecuado.
            return res.status(401).json({ message: "Token expirado. Inicia sesión nuevamente." });
        }

        // En cualquier otro error relacionado con el token, responde con un mensaje genérico.
        return res.status(401).json({ message: "Token inválido" });
    }
};

// Exporta el middleware para usarlo en otras partes de la aplicación.
module.exports = authenticateToken;