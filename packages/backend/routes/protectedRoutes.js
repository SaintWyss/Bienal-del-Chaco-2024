// Se importa el módulo express para crear el enrutador de la API
const express = require("express");

// Se importan los middlewares de autenticación y verificación de estado del usuario
const checkUserStatus = require("../middlewares/checkUserStatus");
const authMiddleware = require("../middlewares/authMiddleware");

// Crear un enrutador con express
const router = express.Router();

// Aplicar el middleware de autenticación para verificar el token JWT
router.use(authMiddleware); // Primero se valida que el usuario esté autenticado

// Luego se aplica el middleware para verificar el estado del usuario (activo, etc.)
router.use(checkUserStatus); // Se verifica si el usuario está habilitado o tiene permisos

// Ruta protegida para el dashboard, solo accesible para usuarios autenticados y con estado válido
router.get("/dashboard", (req, res) => {
    // Si el usuario está autenticado y su estado es válido, se le da acceso al panel
    res.json({ message: "Bienvenido al panel de control" });
});

// Ruta protegida para realizar alguna acción (por ejemplo, cambiar configuración)
router.post("/acciones", (req, res) => {
    // Acción ejecutada con éxito
    res.json({ message: "Acción ejecutada correctamente" });
});

// Exportamos el enrutador para usarlo en otras partes de la aplicación
module.exports = router;
