// Importamos los módulos necesarios
const express = require("express");
// Importamos las funciones del controlador para manejar los votos
const { castVote, deleteVote } = require("../controllers/votoController");
// Importamos el middleware para la autenticación del token
const authenticateToken = require("../middlewares/authMiddleware");

// Creamos una instancia del enrutador de Express
const router = express.Router();

// Ruta para registrar o actualizar un voto
// Esta ruta utiliza el método POST para recibir el ID de la escultura
// Requiere que el usuario esté autenticado mediante un token JWT
router.post("/:esculturaId", authenticateToken, castVote);

// Ruta para eliminar un voto
// Esta ruta utiliza el método DELETE para recibir el ID de la escultura
// Requiere que el usuario esté autenticado mediante un token JWT
router.delete("/:esculturaId", authenticateToken, deleteVote);

// Exportamos el enrutador para que pueda ser usado en otros archivos
module.exports = router;