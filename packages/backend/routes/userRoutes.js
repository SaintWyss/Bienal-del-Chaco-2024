/**
 * Module: UserRoutes
 * Responsibilities:
 * - Define routes for User operations.
 * - Map routes to UserController methods.
 * - Apply authentication and role middlewares.
 * Collaborators:
 * - Express Router
 * - UserController
 * - AuthMiddleware
 * - RoleMiddleware
 */
const express = require("express");
const {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", authenticateToken, roleMiddleware("admin"), getUsers);
router.post("/", authenticateToken, roleMiddleware("admin"), createUser);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, roleMiddleware("admin"), updateUser);
router.delete("/:id", authenticateToken, roleMiddleware("admin"), deleteUser);

module.exports = router;