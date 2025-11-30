/**
 * Module: RoleController
 * Responsibilities:
 * - Handle HTTP requests for Role operations.
 * - Delegate business logic to RoleService.
 * - Send appropriate HTTP responses.
 * Collaborators:
 * - RoleService
 */
const roleService = require("../services/roleService");

const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const user = await roleService.updateUserRole(id, role);
        res.status(200).json({ message: "Rol actualizado correctamente", user });
    } catch (error) {
        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = { updateUserRole };