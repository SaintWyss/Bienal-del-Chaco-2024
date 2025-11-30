/**
 * Module: EscultorController
 * Responsibilities:
 * - Handle HTTP requests for Escultor operations.
 * - Delegate business logic to EscultorService.
 * - Send appropriate HTTP responses.
 * Collaborators:
 * - EscultorService
 */
const escultorService = require("../services/escultorService");

const crearEscultor = async (req, res) => {
    try {
        const escultor = await escultorService.crearEscultor(req.body);
        res.status(201).json({ message: "Escultor creado exitosamente", escultor });
    } catch (error) {
        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const obtenerEscultores = async (req, res) => {
    try {
        const escultores = await escultorService.obtenerEscultores();
        res.json(escultores);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener escultores' });
    }
};

const obtenerEscultorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const escultor = await escultorService.obtenerEscultorPorId(id);
        res.json(escultor);
    } catch (error) {
        if (error.message === "ESCULTOR_NOT_FOUND") {
            return res.status(404).json({ message: 'Escultor no encontrado' });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const actualizarEscultor = async (req, res) => {
    try {
        const { id } = req.params;
        const escultor = await escultorService.actualizarEscultor(id, req.body);
        res.status(200).json({ message: "Escultor actualizado exitosamente", escultor });
    } catch (error) {
        if (error.message === "ESCULTOR_NOT_FOUND") {
            return res.status(404).json({ message: "Escultor no encontrado" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const eliminarEscultor = async (req, res) => {
    try {
        const { id } = req.params;
        await escultorService.eliminarEscultor(id);
        res.status(200).json({ message: "Escultor eliminado exitosamente" });
    } catch (error) {
        if (error.message === "ESCULTOR_NOT_FOUND") {
            return res.status(404).json({ message: "Escultor no encontrado" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    crearEscultor,
    obtenerEscultores,
    obtenerEscultorPorId,
    actualizarEscultor,
    eliminarEscultor,
};