/**
 * Module: QrRoutes
 * Responsibilities:
 * - Define routes for QR operations.
 * - Map routes to QrController methods.
 * - Apply authentication middleware.
 * Collaborators:
 * - Express Router
 * - QrController
 * - AuthMiddleware
 */
const express = require("express");
const { generateQr, validateQr } = require("../controllers/qrController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generateQr);
router.get("/validate/:uniqueCode", validateQr);

module.exports = router;