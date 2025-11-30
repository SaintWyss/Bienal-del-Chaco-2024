// Importación de dependencias y funciones
const express = require("express"); // Framework para crear aplicaciones web en Node.js
// Controladores que manejan las solicitudes relacionadas con usuarios
const {
    getUsers, // Función para obtener todos los usuarios
    createUser, // Función para crear un nuevo usuario
    getUserById, // Función para obtener un usuario por ID
    updateUser, // Función para actualizar un usuario por ID
    deleteUser, // Función para eliminar un usuario por ID
} = require("../controllers/userController");
// Middleware para autenticar el token JWT
const authenticateToken = require("../middlewares/authMiddleware");
// Middleware para verificar si el usuario tiene el rol adecuado
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router(); // Crea un enrutador para gestionar las rutas de usuario

// Definición de las rutas para gestionar usuarios
// Ruta para obtener todos los usuarios (solo accesible para administradores)
router.get("/", authenticateToken, roleMiddleware("admin"), getUsers); // Solo admins

// Ruta para crear un nuevo usuario (solo accesible para administradores)
router.post("/", authenticateToken, roleMiddleware("admin"), createUser); // Solo admins

// Ruta para obtener un usuario específico por ID (accesible para cualquier usuario autenticado)
router.get("/:id", authenticateToken, getUserById); // Cualquier usuario autenticado

// Ruta para actualizar un usuario por ID (solo accesible para administradores)
router.put("/:id", authenticateToken, roleMiddleware("admin"), updateUser); // Solo admins

// Ruta para eliminar un usuario por ID (solo accesible para administradores)
router.delete("/:id", authenticateToken, roleMiddleware("admin"), deleteUser); // Solo admins

// Exportación del enrutador para usarlo en la aplicación principal
module.exports = router;