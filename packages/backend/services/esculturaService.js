/**
 * Class: EsculturaService
 * Responsibilities:
 * - Handle business logic for Escultura (Create, Read, Update, Delete).
 * - Validate input data for sculptures.
 * Collaborators:
 * - Escultura (Model)
 * - Escultor (Model)
 * - User (Model)
 * - Evento (Model)
 */
const { Escultura, Escultor, User, Evento } = require("../models");

class EsculturaService {
    async crearEscultura(data) {
        const { nombre, escultorId, eventoId } = data;
        const userId = escultorId;

        const escultor = await Escultor.findOne({
            where: { userId },
            include: [
                {
                    model: Escultura,
                    as: "escultura",
                },
                {
                    model: User,
                    as: "usuario",
                    attributes: ["nombre"],
                },
            ],
        });

        if (!escultor) {
            throw new Error("ESCULTOR_NOT_FOUND");
        }

        return await Escultura.create({
            nombre,
            userId,
            eventoId,
        });
    }

    async obtenerEsculturas(filters) {
        const { escultorId } = filters;
        const where = {};
        if (escultorId) {
            where['userId'] = escultorId;
        }

        const esculturas = await Escultura.findAll({
            where,
            include: [
                {
                    model: Escultor,
                    as: "escultor",
                    include: [
                        {
                            model: User,
                            as: "usuario",
                            attributes: ["id", "nombre"],
                        }
                    ]
                },
                {
                    model: Evento,
                    as: "evento",
                    attributes: ["id", "nombre", "tematica"],
                },
            ],
        });

        if (esculturas.length === 0) {
            throw new Error("NO_ESCULTURAS_FOUND");
        }

        return esculturas;
    }

    async obtenerEsculturaPorId(id) {
        const escultura = await Escultura.findByPk(id, {
            include: [
                {
                    model: Escultor,
                    as: "escultor",
                    include: [
                        {
                            model: User,
                            as: "usuario",
                            attributes: ["id", "nombre"],
                        }
                    ]
                },
                {
                    model: Evento,
                    as: "evento",
                    attributes: ["id", "nombre", "tematica"],
                },
            ],
        });

        if (!escultura) {
            throw new Error("ESCULTURA_NOT_FOUND");
        }

        return escultura;
    }

    async obtenerEsculturasPorEvento(eventoId) {
        const esculturas = await Escultura.findAll({
            where: { eventoId },
            include: [
                {
                    model: Escultor,
                    as: "escultor",
                    include: [
                        {
                            model: User,
                            as: "usuario",
                            attributes: ["id", "nombre"],
                        }
                    ]
                },
                {
                    model: Evento,
                    as: "evento",
                    attributes: ["id", "nombre", "tematica"],
                },
            ],
        });

        if (esculturas.length === 0) {
            throw new Error("NO_ESCULTURAS_FOUND");
        }

        return esculturas;
    }

    async actualizarEscultura(id, data) {
        const { nombre, descripcion, plano, imagenes, imagenFinal, fechaCreacion, usuarioId, eventoId } = data;

        const escultura = await Escultura.findByPk(id);
        if (!escultura) {
            throw new Error("ESCULTURA_NOT_FOUND");
        }

        return await escultura.update({
            nombre,
            descripcion,
            plano,
            imagenes,
            imagenFinal,
            fechaCreacion,
            userId: usuarioId,
            eventoId,
        });
    }

    async eliminarEscultura(id) {
        const escultura = await Escultura.findByPk(id);
        if (!escultura) {
            throw new Error("ESCULTURA_NOT_FOUND");
        }

        const escultor = await Escultor.findByPk(escultura.userId);
        if (escultor) {
            escultor.escultura = null;
            await escultor.save();
        }

        await escultura.destroy();
        return true;
    }
}

module.exports = new EsculturaService();
