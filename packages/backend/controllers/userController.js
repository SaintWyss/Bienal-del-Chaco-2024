const { User } = require("../models");
const { processUserData } = require("../middlewares/userMiddleware");



// Obtener todos los usuarios
const getUsers = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10; // Número de usuarios por página
    const offset = parseInt(req.query.offset) || 0; // Página actual
    try {
        // Buscar todos los usuarios con los atributos necesarios
        const users = await User.findAll({
            attributes: ["id", "username", "email", "role", "isActive", "expiryDate"],
        });
        // Responder con los usuarios obtenidos
        res.status(200).json({ users });
    } catch (error) {
        // Manejo de errores con mensaje genérico para evitar filtración de detalles
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { nombre, username, email, password, role, isActive } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!nombre || !username || !email || !password) {
            return res.status(400).json({ message: "Nombre, usuario, correo y contraseña son obligatorios" });
        }

        // Crear el usuario con los datos proporcionados
        let user = User.build({
            nombre,
            username,
            email,
            password,
            role: role || "user", // Valor predeterminado
            isActive: isActive !== undefined ? isActive : true, // Valor predeterminado
        });

        // Procesar los datos del usuario (ej. encriptar la contraseña)
        await processUserData(user);

        // Guardar el usuario en la base de datos
        user = await user.save();

        // Responder con el mensaje de éxito y el usuario creado
        res.status(201).json({ message: "Usuario creado con éxito", user });
    } catch (error) {
        // Manejo de errores con mensaje genérico
        res.status(500).json({ message: "Error al crear el usuario" });
    }
};

// Obtener un usuario por id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar un usuario por su ID
        const user = await User.findByPk(id, {
            attributes: ["id", "username", "email", "role", "isActive", "expiryDate"],
        });

        // Si no se encuentra el usuario, devolver error 404
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Responder con el usuario encontrado
        res.status(200).json({ user });
    } catch (error) {
        // Manejo de errores con mensaje genérico
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar un usuario por id
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, isActive, password } = req.body;

        // Buscar el usuario por su ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizar los campos si se proporcionan
        if (role) user.role = role;
        if (isActive !== undefined) user.isActive = isActive;
        if (password) user.password = password;

        // Guardar los cambios en el usuario
        await user.save();
        res.status(200).json({ message: "Usuario actualizado correctamente", user });
    } catch (error) {
        // Manejo de errores con mensaje genérico
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar un usuario por id
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el usuario por su ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Eliminar el usuario
        await user.destroy();
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        // Manejo de errores con mensaje genérico
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