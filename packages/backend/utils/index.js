// Exportación de utilidades desde la carpeta 'utils'
// Estas utilidades están disponibles para su uso en otras partes del proyecto

// Requiere el archivo 'jwt' para manejar la autenticación y los tokens JWT
const jwt = require('./jwt');

// Requiere el archivo 'qrcode' para generar y manejar códigos QR
const qrcode = require('./qrcode');

// Requiere el archivo 'validation' para manejar la validación de datos
const validation = require('./validation');

// Exporta los módulos de 'jwt', 'qrcode' y 'validation' para su uso en otras partes del código
module.exports = {
    jwt,       // Utilidad para manejo de JWT
    qrcode,    // Utilidad para manejo de códigos QR
    validation // Utilidad para validaciones de datos
};