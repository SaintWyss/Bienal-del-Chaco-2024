/**
 * Module: RoleRoutes
 * Responsibilities:
 * - Define routes for Role operations.
 * - Map routes to RoleController methods.
 * - Apply authentication and role middlewares.
 * Collaborators:
 * - Express Router
 * - RoleController
 * - AuthMiddleware
 * - RoleMiddleware
 */
const express = require("express");
const { updateUserRole } = require("../controllers/roleController");
const authenticateToken = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.put("/:id", authenticateToken, roleMiddleware("admin"), updateUserRole);

module.exports = router;