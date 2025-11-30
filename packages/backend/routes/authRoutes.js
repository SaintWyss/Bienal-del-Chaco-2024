// Importamos las dependencias necesarias
const express = require("express");  // Express es el framework para gestionar rutas y middleware.
const { login, register } = require("../controllers/authController");  // Importamos los controladores para las rutas de login y registro.
const authMiddleware = require("../middlewares/authMiddleware");  // Importamos el middleware de autenticación.

const router = express.Router();  // Creamos una nueva instancia de router para definir las rutas.

// Ruta para el login: recibe solicitudes POST para iniciar sesión.
router.post("/login", login);  // Cuando se recibe una solicitud POST en /login, se ejecuta el controlador 'login'.

// Ruta para el registro: recibe solicitudes POST para registrar nuevos usuarios.
router.post("/register", register);  // Cuando se recibe una solicitud POST en /register, se ejecuta el controlador 'register'.

// Ruta protegida: solo accesible si el usuario está autenticado.
router.get("/protected", authMiddleware, (req, res) => {
    // Si el middleware de autenticación verifica que el usuario está autenticado, ejecutamos esta función.
    res.json({ message: "Acceso permitido", user: req.user });  // Respondemos con un mensaje de acceso permitido y la información del usuario.
});

// Exportamos el router para que pueda ser utilizado en otros archivos.
module.exports = router;