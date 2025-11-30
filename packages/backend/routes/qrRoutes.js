// Importamos los módulos necesarios
const express = require("express"); // Express es un framework para manejar las rutas HTTP
const { generateQr, validateQr } = require("../controllers/qrController"); // Controladores para generar y validar el QR
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticación

// Creamos un enrutador para manejar las rutas
const router = express.Router();

// Ruta para generar un QR, que requiere autenticación mediante el middleware `authMiddleware`
router.post("/generate", authMiddleware, generateQr);
// `authMiddleware` verificará que el usuario esté autenticado antes de generar el QR

// Ruta para validar un QR escaneado utilizando el código único que se pasa en la URL
router.get("/validate/:uniqueCode", validateQr);
// `validateQr` es el controlador que valida el QR con el código único proporcionado en la URL

// Exportamos el router para que pueda ser utilizado en otros archivos
module.exports = router;