/**
 * Script: TestVotar
 * Responsibilities:
 * - Test adding stars to an Escultura and updating Escultor score.
 * Collaborators:
 * - Escultura (Model)
 * - Escultor (Model)
 */
const { Escultura, Escultor } = require("../models");

const addStars = async (esculturaId, starsToAdd) => {
    try {
        const escultura = await Escultura.findByPk(esculturaId);
        if (!escultura) {
            throw new Error("Escultura not found");
        }

        await escultura.increment("puntuacion", { by: starsToAdd });

        const escultor = await Escultor.findByPk(escultura.escultorId);
        if (!escultor) {
            throw new Error("Escultor not found");
        }

        await escultor.increment("puntuacionTotal", { by: starsToAdd });

    } catch (error) {
        console.error("Error adding stars:", error.message);
    }
};

addStars(1, 5);