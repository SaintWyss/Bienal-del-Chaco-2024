// Importación de librerías necesarias
const bcrypt = require("bcryptjs");
const { User } = require("../models"); // Modelo de usuario
const { generateToken } = require("../utils/jwt"); // Función para generar token JWT

// Función para registrar un usuario
const register = async (req, res) => {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { nombre, username, email, password, role } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!nombre || !username || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Verificar si ya existe un usuario con el mismo nombre de usuario
        const userExists = await User.findOne({ where: { username } });
        if (userExists) {
            return res.status(400).json({ message: "El nombre de usuario ya está registrado" });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario con los datos proporcionados
        const newUser = await User.create({
            nombre,            // Nombre completo del usuario
            username,          // Nombre de usuario único
            email,             // Correo electrónico del usuario
            password: hashedPassword, // Contraseña encriptada
            role: role || "user", // Rol del usuario, por defecto 'user'
            isActive: true,    // Establecer el usuario como activo por defecto
        });

        // Responder con un mensaje de éxito y los detalles del nuevo usuario
        res.status(201).json({
            message: "Usuario registrado exitosamente",
            user: { id: newUser.id, username: newUser.username, role: newUser.role }
        });
    } catch (error) {
        // Manejo de errores: si ocurre algún error en el proceso, enviamos un mensaje genérico
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para iniciar sesión
const login = async (req, res) => {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { username, password } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!username || !password) {
            return res.status(400).json({ message: "Nombre de usuario y contraseña son obligatorios" });
        }

        // Buscar al usuario en la base de datos por el nombre de usuario
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar que la contraseña proporcionada coincida con la contraseña encriptada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // Generar un token JWT para el usuario con su ID, nombre de usuario y rol
        const token = generateToken({
            id: user.id,
            username: user.username,
            role: user.role, // Incluir el rol del usuario en el token
        });

        // Responder con un mensaje de éxito, el token generado y los detalles del usuario
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token, // Token JWT para autenticar al usuario en futuras solicitudes
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            },
        });
    } catch (error) {
        // Manejo de errores: si ocurre algún error en el proceso, enviamos un mensaje genérico
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Exportar las funciones de registro e inicio de sesión
module.exports = { register, login };