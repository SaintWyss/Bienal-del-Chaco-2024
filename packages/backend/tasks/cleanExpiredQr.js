const { Qr } = require("../models"); // Importa el modelo Qr para interactuar con la base de datos
const fs = require("fs"); // Importa el módulo fs para manejar operaciones de archivos

/**
 * Función para limpiar los códigos QR que han expirado.
 * Elimina los QR que tienen una fecha de expiración anterior a la fecha actual
 * y los registra en un archivo de logs si es necesario.
 */
const cleanExpiredQr = async () => {
    try {
        // Obtiene la fecha y hora actuales
        const now = new Date();

        // Busca todos los códigos QR que han expirado (fecha de expiración menor que la fecha actual)
        const expiredQrs = await Qr.findAll({
            where: { expiration: { [Op.lt]: now } }, // Filtra los QR expirados
        });

        // Si se encontraron QR expirados, los registra en un archivo de log
        if (expiredQrs.length > 0) {
            // Registra los QR expirados en el archivo 'expired_qrs.log' en formato JSON
            fs.appendFileSync(
                "./logs/expired_qrs.log",
                JSON.stringify(expiredQrs, null, 2) // Convierte los datos en formato legible
            );
        }

        // Elimina los QR expirados de la base de datos
        const result = await Qr.destroy({
            where: { expiration: { [Op.lt]: now } }, // Elimina los QR que han expirado
        });

        // Retorna el resultado de la operación (número de registros eliminados)
        // Se elimina el console.log, ya que no es necesario mostrarlo
    } catch (error) {
        // Solo se maneja el error de forma mínima, sin imprimir detalles innecesarios
        console.error("Error al limpiar códigos QR expirados:", error.message);
    }
};

module.exports = cleanExpiredQr; // Exporta la función para que pueda ser usada en otros archivos