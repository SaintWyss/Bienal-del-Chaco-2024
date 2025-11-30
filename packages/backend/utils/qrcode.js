const QRCode = require('qrcode');

// Función para generar un código QR a partir de un texto
const generateQRCode = async (text) => {
    try {
        // Genera el código QR en formato Data URL y lo devuelve
        return await QRCode.toDataURL(text);
    } catch (error) {
        // Error manejado de manera mínima para no sobrecargar la aplicación con detalles innecesarios
        throw new Error("Error al generar el código QR");
    }
};

module.exports = {
    generateQRCode, // Exporta la función para que pueda ser utilizada en otros módulos
};