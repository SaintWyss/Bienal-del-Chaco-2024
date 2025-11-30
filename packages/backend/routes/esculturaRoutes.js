/**
 * Module: EsculturaRoutes
 * Responsibilities:
 * - Define routes for Escultura operations.
 * - Map routes to EsculturaController methods.
 * - Apply authentication and role middlewares.
 * Collaborators:
 * - Express Router
 * - EsculturaController
 * - AuthMiddleware
 * - RoleMiddleware
 */
const express = require("express");

const {
    crearEscultura,
    obtenerEsculturas,
    obtenerEsculturaPorId,
    obtenerEsculturasPorEvento,
    actualizarEscultura,
    eliminarEscultura,
} = require("../controllers/esculturaController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
        await crearEscultura(req, res);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la escultura" });
    }
});

router.get("/", async (req, res) => {
    try {
        await obtenerEsculturas(req, res);
    } catch (error) {
        console.error("Error en la ruta /api/esculturas:", error.message);
        if (error.stack) {
            console.error("Stack trace:", error.stack);
        }
        const errorMessage = error instanceof Error && error.message ? error.message : "Error desconocido";
        res.status(500).json({
            error: errorMessage,
            message: "Hubo un problema al obtener las esculturas. Intenta nuevamente más tarde.",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        await obtenerEsculturaPorId(req, res);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la escultura por ID" });
    }
});

router.get("/evento/:eventoId", async (req, res) => {
    try {
        await obtenerEsculturasPorEvento(req, res);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la escultura por evento" });
    }
});

router.put("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
        await actualizarEscultura(req, res);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la escultura" });
    }
});

router.delete("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
        await eliminarEscultura(req, res);
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la escultura" });
    }
});

module.exports = router;