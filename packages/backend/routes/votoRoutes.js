/**
 * Module: VotoRoutes
 * Responsibilities:
 * - Define routes for Voto operations.
 * - Map routes to VotoController methods.
 * - Apply authentication middleware.
 * Collaborators:
 * - Express Router
 * - VotoController
 * - AuthMiddleware
 */
const express = require("express");
const { castVote, deleteVote } = require("../controllers/votoController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:esculturaId", authenticateToken, castVote);
router.delete("/:esculturaId", authenticateToken, deleteVote);

module.exports = router;