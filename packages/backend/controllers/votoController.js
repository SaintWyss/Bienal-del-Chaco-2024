/**
 * Module: VotoController
 * Responsibilities:
 * - Handle HTTP requests for Voto operations.
 * - Delegate business logic to VotoService.
 * - Send appropriate HTTP responses.
 * Collaborators:
 * - VotoService
 */
const votoService = require("../services/votoService");

const castVote = async (req, res) => {
    try {
        const { esculturaId } = req.params;
        const { puntuacion, qrCode } = req.body;
        const userId = req.user.id;

        const isQrValid = await votoService.validateQr(qrCode, esculturaId);
        if (!isQrValid) {
            return res.status(400).json({ message: "QR no válido o expirado" });
        }

        const voto = await votoService.createOrUpdateVote(userId, esculturaId, puntuacion);
        res.status(200).json({ message: "Voto registrado exitosamente", voto });
    } catch (error) {
        if (error.message === "ESCULTURA_NOT_FOUND") {
            return res.status(404).json({ message: "Escultura no encontrada" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const deleteVote = async (req, res) => {
    try {
        const { esculturaId } = req.params;
        const userId = req.user.id;

        await votoService.deleteVote(userId, esculturaId);
        res.status(200).json({ message: "Voto eliminado exitosamente" });
    } catch (error) {
        if (error.message === "VOTO_NOT_FOUND") {
            return res.status(404).json({ message: "Voto no encontrado" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = { castVote, deleteVote };