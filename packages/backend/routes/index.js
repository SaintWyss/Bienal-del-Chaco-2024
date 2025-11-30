// Importar las dependencias necesarias de Express y las rutas
const express = require("express");
const userRoutes = require("./userRoutes");
const escultorRoutes = require("./escultorRoutes");
const roleRoutes = require("./roleRoutes"); // Ruta para gestionar roles
const esculturaRoutes = require("./esculturaRoutes");
const eventoRoutes = require("./eventoRoutes");
const votoRoutes = require("./votoRoutes");
const qrRoutes = require("./qrRoutes");
const authRoutes = require("./authRoutes");

// Crear un enrutador de Express para organizar las rutas
const router = express.Router();

// Configurar las rutas que se utilizarán en la aplicación
// Cada ruta maneja una funcionalidad específica dentro del sistema
router.use("/users", userRoutes); // Rutas para manejar usuarios
router.use("/escultores", escultorRoutes); // Rutas para manejar escultores
router.use("/roles", roleRoutes); // Rutas para manejar roles de usuarios
router.use("/esculturas", esculturaRoutes); // Rutas para manejar esculturas
router.use("/eventos", eventoRoutes); // Rutas para manejar eventos
router.use("/votos", votoRoutes); // Rutas para manejar votos
router.use("/qr", qrRoutes); // Rutas para manejar códigos QR
router.use("/auth", authRoutes); // Rutas para manejar autenticación y autorización

// Exportar el enrutador para ser utilizado en otros archivos de la aplicación
module.exports = router;