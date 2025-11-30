// Importación de las dependencias necesarias
const express = require("express");
const {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento,
} = require("../controllers/eventoController"); // Controladores para las operaciones de eventos
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticación
const roleMiddleware = require("../middlewares/roleMiddleware"); // Middleware para la validación de roles

const router = express.Router(); // Crea un router para manejar las rutas de eventos

// Ruta para crear un evento
// Solo accesible para administradores (mediante el middleware de autenticación y roles)
router.post("/", authMiddleware, roleMiddleware("admin"), crearEvento);

// Ruta para obtener todos los eventos
// No requiere autenticación, pero puedes añadirla si lo necesitas en el futuro
router.get("/", obtenerEventos);

// Ruta para obtener un evento específico por ID
router.get("/:id", obtenerEventoPorId);

// Ruta para actualizar un evento
// Solo accesible para administradores (mediante el middleware de autenticación y roles)
router.put("/:id", authMiddleware, roleMiddleware("admin"), actualizarEvento);

// Ruta para eliminar un evento
// Solo accesible para administradores (mediante el middleware de autenticación y roles)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), eliminarEvento);

// Exporta el router para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;