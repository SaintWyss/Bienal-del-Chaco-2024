/**
 * Module: QrController
 * Responsibilities:
 * - Handle HTTP requests for QR operations.
 * - Delegate business logic to QrService.
 * - Send appropriate HTTP responses.
 * Collaborators:
 * - QrService
 */
const qrService = require("../services/qrService");

const generateQr = async (req, res, next) => {
    try {
        const { esculturaId } = req.body;
        const result = await qrService.generateEsculturaQRCode(esculturaId);
        res.status(201).json(result);
    } catch (error) {
        if (error.message === "ESCULTURA_NOT_FOUND") {
            return res.status(404).json({ message: "Escultura no encontrada" });
        }
        next(error);
    }
};

const validateQr = async (req, res) => {
    try {
        const { uniqueCode } = req.params;
        const escultura = await qrService.validateQRCode(uniqueCode);
        res.status(200).json({ escultura });
    } catch (error) {
        if (error.message === "QR_NOT_FOUND") {
            return res.status(404).json({ message: "Código QR no encontrado" });
        }
        if (error.message === "QR_EXPIRED") {
            return res.status(400).json({ message: "El código QR ha expirado" });
        }
        if (error.message === "ESCULTURA_NOT_FOUND") {
            return res.status(404).json({ message: "Escultura no encontrada" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    generateQr,
    validateQr,
};