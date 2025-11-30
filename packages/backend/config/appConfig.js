// Exporta la configuración de JWT para su uso en la autenticación
module.exports = {
    // Se obtiene la clave secreta desde las variables de entorno, con un valor por defecto para desarrollo
    JWT_SECRET: process.env.JWT_SECRET || 'default_secret', // Utiliza 'default_secret' si no está configurada en las variables de entorno

    // Se obtiene el tiempo de expiración del token desde las variables de entorno, con un valor por defecto
    JWT_EXPIRATION: process.env.JWT_EXPIRES_IN || '1h', // Utiliza '1h' si no está configurada en las variables de entorno
};