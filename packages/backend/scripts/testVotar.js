// Requerimos los modelos de Escultura y Escultor para interactuar con la base de datos
const { Escultura, Escultor } = require("../models");

/**
 * Función para añadir estrellas a una escultura y actualizar la puntuación del escultor.
 * @param {number} esculturaId - ID de la escultura a la que se le sumarán las estrellas.
 * @param {number} starsToAdd - Número de estrellas que se añadirán.
 */
const addStars = async (esculturaId, starsToAdd) => {
    try {
        // 1. Buscar la escultura por su ID
        const escultura = await Escultura.findByPk(esculturaId);
        if (!escultura) {
            // Si no se encuentra la escultura, lanzar un error
            throw new Error("Escultura no encontrada");
        }

        // 2. Actualizar la puntuación de la escultura
        await escultura.increment("puntuacion", { by: starsToAdd });

        // 3. Buscar al escultor asociado a la escultura
        const escultor = await Escultor.findByPk(escultura.escultorId);
        if (!escultor) {
            // Si no se encuentra el escultor, lanzar un error
            throw new Error("Escultor no encontrado");
        }

        // 4. Actualizar la puntuación total del escultor
        await escultor.increment("puntuacionTotal", { by: starsToAdd });

        // Información exitosa: No es necesario usar console.log, ya que en producción no se deben usar logs.
        // Si es necesario, se puede hacer un registro en la base de datos o en un sistema de logging.
    } catch (error) {
        // Solo se registran los errores mínimos para evitar mostrar demasiada información al usuario.
        console.error("Error al sumar las estrellas:", error.message);
    }
};

// Llamada a la función para añadir 5 estrellas a la escultura con ID 1
addStars(1, 5);