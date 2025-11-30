/**
 * Module: EscultorRoutes
 * Responsibilities:
 * - Define routes for Escultor operations.
 * - Map routes to EscultorController methods.
 * - Apply authentication and role middlewares.
 * Collaborators:
 * - Express Router
 * - EscultorController
 * - AuthMiddleware
 * - RoleMiddleware
 */
const express = require('express');
const router = express.Router();

const {
    crearEscultor,
    obtenerEscultores,
    obtenerEscultorPorId,
    actualizarEscultor,
    eliminarEscultor,
} = require("../controllers/escultorController");

const authenticateToken = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/", authenticateToken, roleMiddleware("admin"), crearEscultor);
router.get("/", obtenerEscultores);
router.get("/:id", authenticateToken, obtenerEscultorPorId);
router.put("/:id", authenticateToken, roleMiddleware("admin"), actualizarEscultor);
router.delete("/:id", authenticateToken, roleMiddleware("admin"), eliminarEscultor);

module.exports = router;