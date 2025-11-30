// Importación de dependencias
const express = require("express");
// Importa el controlador que maneja la lógica para actualizar el rol del usuario
const { updateUserRole } = require("../controllers/roleController");
// Importa el middleware que autentica al usuario utilizando un token JWT
const authenticateToken = require("../middlewares/authMiddleware");
// Importa el middleware para verificar los roles de los usuarios
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();  // Crea una nueva instancia del router de Express

// Ruta PUT para cambiar el rol del usuario.
// El parámetro":id" se utiliza para identificar al usuario cuyo rol se va a actualizar
// Se aplica el middleware authenticateToken para asegurarse de que el usuario esté autenticado
// Luego se aplica roleMiddleware con el argumento 'admin' para verificar que el usuario sea un administrador
// Finalmente, se llama a la función updateUserRole para realizar la actualización del rol
router.put("/:id", authenticateToken, roleMiddleware("admin"), updateUserRole);

// Exporta el router para que pueda ser utilizado en otros archivos
module.exports = router;