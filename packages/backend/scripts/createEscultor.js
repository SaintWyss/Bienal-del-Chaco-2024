// Requerimos las librerías necesarias
const bcrypt = require("bcryptjs");
const { User, Escultor } = require("../models");

// Función asincrónica para crear un escultor y su usuario asociado
const createEscultor = async () => {
    try {
        // Datos configurables para el escultor
        const nombre = "Escultor Ejemplo2";  // Nombre del escultor
        const username = "escultor12";  // Nombre de usuario
        const email = "escultor12@gmail.com";  // Correo electrónico del escultor
        const password = "escultor123";  // Contraseña del escultor
        const role = "escultor";  // Rol asignado (escultor)

        // Verificar si el usuario ya existe en la base de datos por su nombre de usuario
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            // Si ya existe, no continuamos con la creación
            throw new Error("El usuario escultor ya existe en la base de datos.");
        }

        // Encriptar la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario con los datos proporcionados
        const newUser = await User.create({
            nombre,       // Nombre del usuario
            username,     // Nombre de usuario
            email,        // Correo electrónico
            password: hashedPassword, // Contraseña encriptada
            role,         // Rol del usuario (escultor)
        });

        // Crear el perfil del escultor, asociado al nuevo usuario
        const newEscultor = await Escultor.create({
            userId: newUser.id, // Relacionar el perfil del escultor con el usuario recién creado
            nombre: "Escultor Ejemplo", // Nombre del escultor en el perfil
            biografia: "Este es un escultor de prueba.", // Biografía del escultor
            imagen: "https://example.com/imagen-defecto.png", // Imagen por defecto
            puntuacionTotal: 0, // Puntuación inicial del escultor
            instagram: "https://instagram.com/escultor1", // Instagram del escultor
            facebook: "https://facebook.com/escultor1", // Facebook del escultor
            youtube: "https://youtube.com/escultor1", // YouTube del escultor
            linkedin: "https://linkedin.com/in/escultor1", // LinkedIn del escultor
        });

        // Devolver la información del nuevo usuario y su perfil sin imprimirlos en consola
        return {
            user: newUser.toJSON(),        // Información del usuario
            escultor: newEscultor.toJSON() // Información del escultor
        };
    } catch (error) {
        // Capturar y manejar cualquier error que ocurra durante la creación
        throw new Error(`Error al crear el usuario y escultor: ${error.message}`);
    }
};

// Llamamos a la función para crear el escultor, pero esta vez no se imprime nada en consola
createEscultor()
    .then((result) => {
        // Si la creación es exitosa, podemos usar la información resultante
        // Aquí no mostramos nada en consola; se puede manejar la respuesta de la función
        console.log("Usuario y escultor creados exitosamente.");
    })
    .catch((error) => {
        // Si ocurre un error, se maneja aquí
        console.error(error.message); // Solo se imprime el mensaje del error
    });