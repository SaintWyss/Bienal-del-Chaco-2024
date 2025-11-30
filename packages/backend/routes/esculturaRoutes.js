const express = require("express");

// Importación de las funciones del controlador para manejar las esculturas
const {
    crearEscultura,
    obtenerEsculturas,
    obtenerEsculturaPorId,
    obtenerEsculturasPorEvento,
    actualizarEscultura,
    eliminarEscultura,
} = require("../controllers/esculturaController");

// Importación de los middlewares de autenticación y autorización de roles
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Crear una instancia del router de Express
const router = express.Router();

// Ruta para crear una nueva escultura
// Solo accesible para usuarios con el rol 'escultor' o 'admin'
router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
        // Llamada al controlador para crear la escultura
        await crearEscultura(req, res);
    } catch (error) {
        // Error general, mínimo pero necesario para capturar posibles fallos
        res.status(500).json({ error: "Error al crear la escultura" });
    }
});

// Ruta para obtener todas las esculturas
// Accesible sin restricciones
router.get("/", async (req, res) => {
    try {
        // Llamada al controlador para obtener todas las esculturas
        await obtenerEsculturas(req, res);
    } catch (error) {
        // Control detallado de errores con registro y mensaje al cliente
        console.error("Error en la ruta /api/esculturas:", error.message);

        if (error.stack) {
            console.error("Stack trace:", error.stack); // Registra el stack trace para más detalles
        }

        // Verifica si el error tiene un mensaje detallado y devuélvelo
        const errorMessage = error instanceof Error && error.message ? error.message : "Error desconocido";

        // Responde con un error genérico, pero proporcionando detalles en los registros
        res.status(500).json({
            error: errorMessage,
            message: "Hubo un problema al obtener las esculturas. Intenta nuevamente más tarde.",
        });
    }
});

// Ruta para obtener una escultura por su ID
// Accesible sin restricciones
router.get("/:id", async (req, res) => {
    try {
        // Llamada al controlador para obtener una escultura por ID
        await obtenerEsculturaPorId(req, res);
    } catch (error) {
        // Error general, mínimo pero necesario
        res.status(500).json({ error: "Error al obtener la escultura por ID" });
    }
});

router.get("/evento/:eventoId", async (req, res) => {
    try {
        // Llamada al controlador para obtener una escultura por ID
        await obtenerEsculturasPorEvento(req, res);
    } catch (error) {
        // Error general, mínimo pero necesario
        res.status(500).json({ error: "Error al obtener la escultura por evento" });
    }
});

// Ruta para actualizar una escultura
// Solo accesible para usuarios con el rol 'escultor' o 'admin'
router.put("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
        // Llamada al controlador para actualizar la escultura
        await actualizarEscultura(req, res);
    } catch (error) {
        // Error general, mínimo pero necesario
        res.status(500).json({ error: "Error al actualizar la escultura" });
    }
});

// Ruta para eliminar una escultura
// Solo accesible para usuarios con el rol 'admin'
router.delete("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
        // Llamada al controlador para eliminar la escultura
        await eliminarEscultura(req, res);
    } catch (error) {
        // Error general, mínimo pero necesario
        res.status(500).json({ error: "Error al eliminar la escultura" });
    }
});

// Exportamos el router para usarlo en otros módulos
module.exports = router;