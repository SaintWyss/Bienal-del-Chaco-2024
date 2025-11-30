/**
 * Class: EventoService
 * Responsibilities:
 * - Handle business logic for Evento (Create, Read, Update, Delete).
 * - Validate input data for events.
 * Collaborators:
 * - Evento (Model)
 * - Escultura (Model)
 */
const { Evento, Escultura } = require("../models");

class EventoService {
    async crearEvento(data) {
        const { nombre, tematica, descripcion, fechaInc, fechaFin, imagen } = data;

        if (!nombre || !tematica) {
            throw new Error("MISSING_FIELDS");
        }

        return await Evento.create({
            nombre,
            tematica,
            descripcion: descripcion || null,
            fechaInc: fechaInc || null,
            fechaFin: fechaFin || null,
            imagen: imagen || null,
        });
    }

    async obtenerEventos() {
        return await Evento.findAll({
            include: [
                {
                    model: Escultura,
                    as: "esculturas",
                    attributes: ["id", "nombre"],
                },
            ],
        });
    }

    async obtenerEventoPorId(id) {
        const evento = await Evento.findByPk(id, {
            include: [
                {
                    model: Escultura,
                    as: "esculturas",
                    attributes: ["id", "nombre", "descripcion"],
                },
            ],
        });

        if (!evento) {
            throw new Error("EVENTO_NOT_FOUND");
        }

        return evento;
    }

    async actualizarEvento(id, data) {
        const evento = await Evento.findByPk(id);

        if (!evento) {
            throw new Error("EVENTO_NOT_FOUND");
        }

        const { nombre, tematica, descripcion, fechaInc, fechaFin, imagen } = data;

        return await evento.update({
            nombre,
            tematica,
            descripcion,
            fechaInc,
            fechaFin,
            imagen,
        });
    }

    async eliminarEvento(id) {
        const evento = await Evento.findByPk(id);

        if (!evento) {
            throw new Error("EVENTO_NOT_FOUND");
        }

        await evento.destroy();
        return true;
    }
}

module.exports = new EventoService();
