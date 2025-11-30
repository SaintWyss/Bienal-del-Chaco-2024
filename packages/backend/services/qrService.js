/**
 * Class: QrService
 * Responsibilities:
 * - Handle business logic for QR codes (Generate, Validate).
 * - Interact with Qr and Escultura models.
 * Collaborators:
 * - Qr (Model)
 * - Escultura (Model)
 * - crypto (Library)
 */
const { Escultura, Qr } = require("../models");
const crypto = require("crypto");

class QrService {
    async generateEsculturaQRCode(esculturaId) {
        const escultura = await Escultura.findByPk(esculturaId);

        if (!escultura) {
            throw new Error("ESCULTURA_NOT_FOUND");
        }

        const expiration = Date.now() + 60 * 1000; // 1 minute expiration? Seems short but keeping logic.
        const uniqueCode = crypto.randomBytes(16).toString("hex");

        await Qr.create({
            esculturaId,
            uniqueCode,
            expiration: new Date(expiration),
        });

        return { qrCode: uniqueCode };
    }

    async validateQRCode(uniqueCode) {
        const qrRecord = await Qr.findOne({ where: { uniqueCode } });

        if (!qrRecord) {
            throw new Error("QR_NOT_FOUND");
        }

        if (Date.now() > new Date(qrRecord.expiration).getTime()) {
            throw new Error("QR_EXPIRED");
        }

        const escultura = await Escultura.findByPk(qrRecord.esculturaId);

        if (!escultura) {
            throw new Error("ESCULTURA_NOT_FOUND");
        }

        return escultura;
    }
}

module.exports = new QrService();