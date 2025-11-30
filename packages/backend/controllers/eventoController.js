/**
 * Module: EventoController
 * Responsibilities:
 * - Handle HTTP requests for Evento operations.
 * - Delegate business logic to EventoService.
 * - Send appropriate HTTP responses.
 * Collaborators:
 * - EventoService
 */
const eventoService = require("../services/eventoService");

const crearEvento = async (req, res) => {
    try {
        const evento = await eventoService.crearEvento(req.body);
        res.status(201).json({ message: "Evento creado exitosamente", evento });
    } catch (error) {
        if (error.message === "MISSING_FIELDS") {
            return res.status(400).json({ message: 'Faltan campos requeridos: nombre, tematica' });
        }
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const obtenerEventos = async (req, res) => {
    try {
        const eventos = await eventoService.obtenerEventos();
        res.status(200).json({ eventos });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const obtenerEventoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await eventoService.obtenerEventoPorId(id);
        res.status(200).json({ evento });
    } catch (error) {
        if (error.message === "EVENTO_NOT_FOUND") {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const actualizarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await eventoService.actualizarEvento(id, req.body);
        res.status(200).json({ message: "Evento actualizado exitosamente", evento });
    } catch (error) {
        if (error.message === "EVENTO_NOT_FOUND") {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const eliminarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        await eventoService.eliminarEvento(id);
        res.status(200).json({ message: "Evento eliminado exitosamente" });
    } catch (error) {
        if (error.message === "EVENTO_NOT_FOUND") {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento,
};