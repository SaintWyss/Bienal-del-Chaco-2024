// Requerimos los módulos necesarios
const { generateQRCode } = require("../utils/qrcode"); // Función para generar el QR visual
const { Escultura, Qr } = require("../models"); // Modelos de Escultura y Qr desde la base de datos
const crypto = require("crypto"); // Módulo para generar un código único aleatorio

// Función para generar un código QR para una escultura
const generateEsculturaQRCode = async (esculturaId) => {
    try {
        // Buscamos la escultura en la base de datos por su ID
        const escultura = await Escultura.findByPk(esculturaId);

        // Si no se encuentra la escultura, lanzamos un error
        if (!escultura) {
            throw new Error("Escultura no encontrada");
        }

        // Generamos un código único para el QR utilizando crypto
        const expiration = Date.now() + 60 * 1000; // La expiración del código QR es en 10 minutos
        const uniqueCode = crypto.randomBytes(16).toString("hex"); // Generamos un código único en formato hexadecimal

        // Creamos un nuevo registro del QR en la base de datos
        const qrRecord = await Qr.create({
            esculturaId, // Asociamos el QR con la escultura
            uniqueCode, // Asignamos el código único generado
            expiration: new Date(expiration), // Establecemos la fecha de expiración en formato Date
        });

        // Generamos el código QR visual, que es una imagen
        //const qrCode = await generateQRCode(JSON.stringify({ uniqueCode }));
        //Retorno solo el codigo unico para generar url
        const qrCode = uniqueCode;

        // Retornamos tanto el QR visual como el registro guardado en la base de datos
        return { qrCode };
    } catch (error) {
        console.error('Error en la generación del QR:', error);
        throw error; // Propaga el error si es necesario
    }
};


// Función para validar un QR escaneado
const validateQRCode = async (qrData) => {
    // Parseamos los datos del QR escaneado
    const { esculturaId, uniqueCode, expiration } = JSON.parse(qrData);

    // Verificamos si el código QR ha expirado
    if (Date.now() > expiration) {
        throw new Error("El código QR ha expirado");
    }

    // Verificamos si la escultura asociada al QR existe en la base de datos
    const escultura = await Escultura.findByPk(esculturaId);

    // Si no se encuentra la escultura, lanzamos un error con un código de estado 404
    if (!escultura) {
        throw { status: 404, message: "Escultura no encontrada" };
    }

    // Si todo está bien, retornamos la escultura
    return escultura;
};

// Exportamos las funciones para que puedan ser utilizadas en otros archivos
module.exports = {
    generateEsculturaQRCode,
    validateQRCode,
};