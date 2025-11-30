/**
 * Module: ProtectedRoutes
 * Responsibilities:
 * - Define routes requiring authentication and specific user status.
 * Collaborators:
 * - Express Router
 * - AuthMiddleware
 * - CheckUserStatusMiddleware
 */
const express = require("express");
const checkUserStatus = require("../middlewares/checkUserStatus");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(checkUserStatus);

router.get("/dashboard", (req, res) => {
    res.json({ message: "Welcome to the dashboard" });
});

router.post("/actions", (req, res) => {
    res.json({ message: "Action executed successfully" });
});

module.exports = router;
