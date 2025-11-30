/**
 * Class: VotoService
 * Responsibilities:
 * - Handle business logic for Voto (Create, Update, Delete).
 * - Validate QR codes for voting.
 * - Update scores for Escultura and Escultor.
 * Collaborators:
 * - Voto (Model)
 * - Escultura (Model)
 * - Escultor (Model)
 * - Qr (Model)
 */
const { Voto, Escultura, Escultor, Qr } = require("../models");

class VotoService {
    async validateQr(qrCode, esculturaId) {
        const qrRecord = await Qr.findOne({ where: { uniqueCode: qrCode } });

        if (!qrRecord || qrRecord.esculturaId !== parseInt(esculturaId)) {
            return false;
        }

        return Date.now() <= new Date(qrRecord.expiration);
    }

    async createOrUpdateVote(userId, esculturaId, puntuacion) {
        const existingVote = await Voto.findOne({ where: { userId, esculturaId } });

        if (existingVote) {
            const difference = puntuacion - existingVote.puntuacion;
            await existingVote.update({ puntuacion });
            await this.updateScores(esculturaId, difference);
            return existingVote;
        } else {
            const voto = await Voto.create({ userId, esculturaId, puntuacion });
            await this.updateScores(esculturaId, puntuacion);
            return voto;
        }
    }

    async deleteVote(userId, esculturaId) {
        const existingVote = await Voto.findOne({ where: { userId, esculturaId } });

        if (!existingVote) {
            throw new Error("VOTO_NOT_FOUND");
        }

        await this.updateScores(esculturaId, -existingVote.puntuacion);
        await existingVote.destroy();
    }

    async updateScores(esculturaId, puntuacionDifference) {
        const escultura = await Escultura.findByPk(esculturaId);

        if (!escultura) {
            throw new Error("ESCULTURA_NOT_FOUND");
        }

        await escultura.increment("puntuacion", { by: puntuacionDifference });

        const escultor = await Escultor.findByPk(escultura.userId); // Fixed: escultura.escultorId -> escultura.userId based on Escultura model
        if (escultor) {
            await escultor.increment("puntuacionTotal", { by: puntuacionDifference });
        }
    }
}

module.exports = new VotoService();