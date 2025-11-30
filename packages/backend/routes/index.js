/**
 * Module: Routes Index
 * Responsibilities:
 * - Aggregate all route modules.
 * - Mount routes to specific paths.
 * Collaborators:
 * - Express Router
 * - UserRoutes, EscultorRoutes, RoleRoutes, EsculturaRoutes, EventoRoutes, VotoRoutes, QrRoutes, AuthRoutes
 */
const express = require("express");
const userRoutes = require("./userRoutes");
const escultorRoutes = require("./escultorRoutes");
const roleRoutes = require("./roleRoutes");
const esculturaRoutes = require("./esculturaRoutes");
const eventoRoutes = require("./eventoRoutes");
const votoRoutes = require("./votoRoutes");
const qrRoutes = require("./qrRoutes");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/escultores", escultorRoutes);
router.use("/roles", roleRoutes);
router.use("/esculturas", esculturaRoutes);
router.use("/eventos", eventoRoutes);
router.use("/votos", votoRoutes);
router.use("/qr", qrRoutes);
router.use("/auth", authRoutes);

module.exports = router;