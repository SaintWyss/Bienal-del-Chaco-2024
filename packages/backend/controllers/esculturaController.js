/**
 * Module: EsculturaController
 * Responsibilities:
 * - Handle HTTP requests for Escultura operations.
 * - Delegate business logic to EsculturaService.
 * - Send appropriate HTTP responses.
 * Collaborators:
 * - EsculturaService
 */
const esculturaService = require("../services/esculturaService");

const crearEscultura = async (req, res) => {
    try {
        const nuevaEscultura = await esculturaService.crearEscultura(req.body);
        res.status(201).json(nuevaEscultura);
    } catch (error) {
        if (error.message === "ESCULTOR_NOT_FOUND") {
            return res.status(404).json({ message: "Escultor no encontrado." });
        }
        console.error("Error al crear la escultura:", error);
        res.status(500).json({ error: "Error al crear la escultura" });
    }
};

const obtenerEsculturas = async (req, res) => {
    try {
        const esculturas = await esculturaService.obtenerEsculturas(req.query);
        res.status(200).json({ esculturas });
    } catch (error) {
        if (error.message === "NO_ESCULTURAS_FOUND") {
            return res.status(404).json({ message: "No se encontraron esculturas con los parámetros dados" });
        }
        console.error('Error al obtener esculturas:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const obtenerEsculturaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const escultura = await esculturaService.obtenerEsculturaPorId(id);
        res.status(200).json({ escultura });
    } catch (error) {
        if (error.message === "ESCULTURA_NOT_FOUND") {
            return res.status(404).json({ message: "Escultura no encontrada" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const obtenerEsculturasPorEvento = async (req, res) => {
    try {
        const { eventoId } = req.params;
        const esculturas = await esculturaService.obtenerEsculturasPorEvento(eventoId);
        res.status(200).json({ esculturas });
    } catch (error) {
        if (error.message === "NO_ESCULTURAS_FOUND") {
            return res.status(404).json({ message: "No se encontraron esculturas para este evento" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const actualizarEscultura = async (req, res) => {
    try {
        const { id } = req.params;
        const escultura = await esculturaService.actualizarEscultura(id, req.body);
        res.status(200).json({ message: "Escultura actualizada exitosamente", escultura });
    } catch (error) {
        if (error.message === "ESCULTURA_NOT_FOUND") {
            return res.status(404).json({ message: "Escultura no encontrada" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const eliminarEscultura = async (req, res) => {
    try {
        const { id } = req.params;
        await esculturaService.eliminarEscultura(id);
        res.status(200).json({ message: "Escultura eliminada exitosamente" });
    } catch (error) {
        if (error.message === "ESCULTURA_NOT_FOUND") {
            return res.status(404).json({ message: "Escultura no encontrada" });
        }
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

module.exports = {
    crearEscultura,
    obtenerEsculturas,
    obtenerEsculturaPorId,
    obtenerEsculturasPorEvento,
    actualizarEscultura,
    eliminarEscultura,
};