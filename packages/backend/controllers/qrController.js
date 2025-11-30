const { Qr, Escultura } = require("../models"); // Importamos los modelos necesarios
const qrService = require("../services/qrService"); // Importamos el servicio para generar QR

// Función para generar un QR para una escultura
const generateQr = async (req, res, next) => {
    try {
        const { esculturaId } = req.body; // Extraemos el ID de la escultura del cuerpo de la solicitud
        // Generamos el código QR para la escultura con el ID proporcionado
        const result = await qrService.generateEsculturaQRCode(esculturaId);

        // Enviamos la respuesta con el resultado del QR generado
        res.status(201).json(result);
    } catch (error) {
        // Pasamos el error al middleware de manejo de errores
        next(error);
    }
};

// Función para validar un QR escaneado
const validateQr = async (req, res) => {
    try {
        const { uniqueCode } = req.params; // Extraemos el código único del QR de los parámetros de la solicitud
        // Buscamos el registro del QR en la base de datos usando el código único
        const qrRecord = await Qr.findOne({ where: { uniqueCode } });

        // Si no encontramos el QR, respondemos con un mensaje de error
        if (!qrRecord) {
            return res.status(404).json({ message: "Código QR no encontrado" });
        }

        // Comprobamos si el QR ha expirado comparando la fecha de expiración con la fecha actual
        if (Date.now() > new Date(qrRecord.dataValues.expiration).getTime()) {
            return res.status(400).json({ message: "El código QR ha expirado" });
        }
        // Obtenemos la escultura asociada al QR usando el ID de la escultura
        const escultura = await Escultura.findByPk(qrRecord.esculturaId);

        // Si no encontramos la escultura, respondemos con un mensaje de error
        if (!escultura) {
            return res.status(404).json({ message: "Escultura no encontrada" });
        }

        // Si todo es válido, respondemos con un mensaje de éxito y la información de la escultura
        res.status(200).json({ escultura });
    } catch (error) {
        // Manejo de errores: si ocurre un error, lo capturamos y respondemos con un mensaje genérico
        // Se eliminó el console.error por razones de seguridad para no exponer detalles del error
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    generateQr,
    validateQr,
};