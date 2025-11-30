// Importamos el framework Express y creamos un router
const express = require('express');
const router = express.Router();

// Importamos las funciones del controlador de escultores
const {
    crearEscultor,
    obtenerEscultores,
    obtenerEscultorPorId,
    actualizarEscultor,
    eliminarEscultor,
} = require("../controllers/escultorController");

// Importamos los middleware para autenticación y autorización
const authenticateToken = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Ruta para crear un escultor. Solo accesible para usuarios con rol 'admin'
// El middleware 'authenticateToken' verifica si el usuario está autenticado.
// El middleware 'roleMiddleware' asegura que solo los administradores puedan crear escultores.
router.post("/", authenticateToken, roleMiddleware("admin"), crearEscultor);

// Ruta para obtener todos los escultores. Solo accesible para usuarios autenticados.
// El middleware 'authenticateToken' verifica si el usuario está autenticado.
router.get("/", obtenerEscultores);

// Ruta para obtener un escultor por su ID. Solo accesible para usuarios autenticados.
// El middleware 'authenticateToken' verifica si el usuario está autenticado.
router.get("/:id", authenticateToken, obtenerEscultorPorId);

// Ruta para actualizar un escultor por su ID. Solo accesible para usuarios con rol 'admin'.
// El middleware 'authenticateToken' verifica si el usuario está autenticado.
// El middleware 'roleMiddleware' asegura que solo los administradores puedan actualizar escultores.
router.put("/:id", authenticateToken, roleMiddleware("admin"), actualizarEscultor);

// Ruta para eliminar un escultor por su ID. Solo accesible para usuarios con rol 'admin'.
// El middleware 'authenticateToken' verifica si el usuario está autenticado.
// El middleware 'roleMiddleware' asegura que solo los administradores puedan eliminar escultores.
router.delete("/:id", authenticateToken, roleMiddleware("admin"), eliminarEscultor);

// Exportamos el router para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;