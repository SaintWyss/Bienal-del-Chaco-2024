/**
 * Module: EventoRoutes
 * Responsibilities:
 * - Define routes for Evento operations.
 * - Map routes to EventoController methods.
 * - Apply authentication and role middlewares.
 * Collaborators:
 * - Express Router
 * - EventoController
 * - AuthMiddleware
 * - RoleMiddleware
 */
const express = require("express");
const {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento,
} = require("../controllers/eventoController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("admin"), crearEvento);
router.get("/", obtenerEventos);
router.get("/:id", obtenerEventoPorId);
router.put("/:id", authMiddleware, roleMiddleware("admin"), actualizarEvento);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), eliminarEvento);

module.exports = router;