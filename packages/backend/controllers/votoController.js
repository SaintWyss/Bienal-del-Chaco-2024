const votoService = require("../services/votoService");

// Función para crear o actualizar un voto
const castVote = async (req, res) => {
    try {
        // Obtener los parámetros y datos del cuerpo de la solicitud
        const { esculturaId } = req.params;  // ID de la escultura a votar
        const { puntuacion, qrCode } = req.body;  // Puntuación y código QR enviados por el usuario
        const userId = req.user.id;  // ID del usuario que realiza el voto

        // Validar el código QR
        const isQrValid = await votoService.validateQr(qrCode, esculturaId);
        if (!isQrValid) {
            // Si el QR no es válido o está expirado, se responde con error
            return res.status(400).json({ message: "QR no válido o expirado" });
        }

        // Registrar o actualizar el voto del usuario
        const voto = await votoService.createOrUpdateVote(userId, esculturaId, puntuacion);
        // Enviar respuesta exitosa con el voto registrado
        res.status(200).json({ message: "Voto registrado exitosamente", voto });
    } catch (error) {
        // Captura cualquier error y responde con un mensaje genérico
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para eliminar un voto
const deleteVote = async (req, res) => {
    try {
        // Obtener el ID de la escultura y el ID del usuario
        const { esculturaId } = req.params;  // ID de la escultura cuyo voto se eliminará
        const userId = req.user.id;  // ID del usuario que eliminó el voto

        // Eliminar el voto usando el servicio
        await votoService.deleteVote(userId, esculturaId);
        // Enviar respuesta exitosa
        res.status(200).json({ message: "Voto eliminado exitosamente" });
    } catch (error) {
        // Captura cualquier error y responde con un mensaje genérico
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Exportar las funciones para ser utilizadas en las rutas
module.exports = { castVote, deleteVote };