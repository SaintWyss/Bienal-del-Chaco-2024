/**
 * Script: CreateEscultor
 * Responsibilities:
 * - Create a sample Escultor and associated User.
 * Collaborators:
 * - User (Model)
 * - Escultor (Model)
 * - bcrypt
 */
const bcrypt = require("bcryptjs");
const { User, Escultor } = require("../models");

const createEscultor = async () => {
    try {
        const nombre = "Escultor Ejemplo2";
        const username = "escultor12";
        const email = "escultor12@gmail.com";
        const password = "escultor123";
        const role = "escultor";

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            throw new Error("User already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nombre,
            username,
            email,
            password: hashedPassword,
            role,
        });

        await Escultor.create({
            userId: newUser.id,
            nombre: "Escultor Ejemplo",
            biografia: "This is a test sculptor.",
            imagen: "https://example.com/imagen-defecto.png",
            puntuacionTotal: 0,
            instagram: "https://instagram.com/escultor1",
            facebook: "https://facebook.com/escultor1",
            youtube: "https://youtube.com/escultor1",
            linkedin: "https://linkedin.com/in/escultor1",
        });

        console.log("User and Escultor created successfully.");
    } catch (error) {
        console.error(`Error creating User and Escultor: ${error.message}`);
    }
};

createEscultor();