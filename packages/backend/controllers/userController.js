/**
 * Module: UserController
 * Responsibilities:
 * - Handle HTTP requests for User operations.
 * - Delegate business logic to UserService.
 * - Send appropriate HTTP responses.
 * Collaborators:
 * - UserService
 */
const userService = require("../services/userService");

const getUsers = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    try {
        const users = await userService.getAllUsers(limit, offset);
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const createUser = async (req, res) => {
    try {
        const { nombre, username, email, password, role, isActive } = req.body;

        if (!nombre || !username || !email || !password) {
            return res.status(400).json({ message: "Nombre, usuario, correo y contraseña son obligatorios" });
        }

        const user = await userService.createUser({ nombre, username, email, password, role, isActive });
        res.status(201).json({ message: "Usuario creado con éxito", user });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario" });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json({ user });
    } catch (error) {
        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, isActive, password } = req.body;

        const user = await userService.updateUser(id, { role, isActive, password });
        res.status(200).json({ message: "Usuario actualizado correctamente", user });
    } catch (error) {
        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};