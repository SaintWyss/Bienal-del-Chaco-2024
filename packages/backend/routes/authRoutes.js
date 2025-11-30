/**
 * Module: AuthRoutes
 * Responsibilities:
 * - Define routes for authentication (login, register).
 * - Map routes to AuthController methods.
 * Collaborators:
 * - Express Router
 * - AuthController
 * - AuthMiddleware
 */
const express = require("express");
const { login, register } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "Acceso permitido", user: req.user });
});

module.exports = router;