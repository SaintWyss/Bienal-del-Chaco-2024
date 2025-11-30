/**
 * Module: AuthController
 * Responsibilities:
 * - Handle HTTP requests for user registration and login.
 * - Delegate business logic to AuthService.
 * - Send appropriate HTTP responses.
 * Collaborators:
 * - AuthService
 */
const authService = require("../services/authService");

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        
        res.status(201).json({
            message: "Usuario registrado exitosamente",
            user
        });
    } catch (error) {
        if (error.message === "MISSING_FIELDS") {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        if (error.message === "USER_ALREADY_EXISTS") {
            return res.status(400).json({ message: "El nombre de usuario ya está registrado" });
        }
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            ...result
        });
    } catch (error) {
        if (error.message === "MISSING_FIELDS") {
            return res.status(400).json({ message: "Nombre de usuario y contraseña son obligatorios" });
        }
        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = { register, login };