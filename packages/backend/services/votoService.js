// Importamos los modelos necesarios desde el archivo de modelos
const { Voto, Escultura, Escultor, Qr } = require("../models");

// Función para validar un código QR
const validateQr = async (qrCode, esculturaId) => {
    // Buscamos un registro del código QR en la base de datos
    const qrRecord = await Qr.findOne({ where: { uniqueCode: qrCode } });

    // Si no se encuentra el código QR o no está asociado a la escultura correcta, retornamos false
    if (!qrRecord || qrRecord.esculturaId !== parseInt(esculturaId)) {
        return false;
    }

    // Verificamos si el QR no ha expirado (comparamos la fecha actual con la fecha de expiración del QR)
    return Date.now() <= new Date(qrRecord.expiration);
};

// Función para crear o actualizar un voto
const createOrUpdateVote = async (userId, esculturaId, puntuacion) => {
    // Buscamos si el usuario ya ha votado esta escultura
    const existingVote = await Voto.findOne({ where: { userId, esculturaId } });

    if (existingVote) {
        // Si ya existe un voto, calculamos la diferencia con la nueva puntuación
        const difference = puntuacion - existingVote.puntuacion;

        // Actualizamos el voto con la nueva puntuación
        await existingVote.update({ puntuacion });

        // Actualizamos las puntuaciones de la escultura y el escultor
        await updateScores(esculturaId, difference);

        // Devolvemos el voto actualizado
        return existingVote;
    } else {
        // Si no existe el voto, creamos uno nuevo
        const voto = await Voto.create({ userId, esculturaId, puntuacion });

        // Actualizamos las puntuaciones de la escultura y el escultor
        await updateScores(esculturaId, puntuacion);

        // Devolvemos el voto recién creado
        return voto;
    }
};

// Función para eliminar un voto
const deleteVote = async (userId, esculturaId) => {
    // Buscamos si el voto existe en la base de datos
    const existingVote = await Voto.findOne({ where: { userId, esculturaId } });

    // Si no se encuentra el voto, lanzamos un error
    if (!existingVote) {
        throw new Error("Voto no encontrado");
    }

    // Restamos la puntuación de la escultura y el escultor al eliminar el voto
    await updateScores(esculturaId, -existingVote.puntuacion);

    // Eliminamos el voto de la base de datos
    await existingVote.destroy();
};

// Función para actualizar las puntuaciones de la escultura y el escultor
const updateScores = async (esculturaId, puntuacionDifference) => {
    // Buscamos la escultura en la base de datos
    const escultura = await Escultura.findByPk(esculturaId);

    // Si no encontramos la escultura, lanzamos un error
    if (!escultura) {
        throw new Error("Escultura no encontrada");
    }

    // Actualizamos la puntuación de la escultura sumando o restando la diferencia de puntuación
    await escultura.increment("puntuacion", { by: puntuacionDifference });

    // Buscamos el escultor asociado a la escultura
    const escultor = await Escultor.findByPk(escultura.escultorId);

    // Si existe el escultor, actualizamos su puntuación total
    if (escultor) {
        await escultor.increment("puntuacionTotal", { by: puntuacionDifference });
    }
};

// Exportamos las funciones para que puedan ser utilizadas en otras partes del proyecto
module.exports = { validateQr, createOrUpdateVote, deleteVote };