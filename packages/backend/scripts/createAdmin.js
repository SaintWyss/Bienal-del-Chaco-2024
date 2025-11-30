// Requiere el modelo de usuario y la librería bcrypt para encriptar contraseñas
const User = require('../models/User');
const bcrypt = require("bcrypt");

// Función para crear un usuario administrador
const createAdmin = async () => {
    try {
        // Verifica si el usuario admin ya existe en la base de datos
        const existingUser = await User.findOne({ where: { username: process.env.ADMIN_USERNAME } });

        // Si el usuario ya existe, se termina la ejecución sin crear uno nuevo
        if (existingUser) {
            return; // El mensaje se elimina para evitar loguear información innecesaria
        }

        // Encripta la contraseña del administrador usando bcrypt con un 'salt rounds' de 10
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        // Crea el usuario administrador con los datos proporcionados en las variables de entorno
        const adminUser = await User.create({
            nombre: process.env.ADMIN_USERNAME,
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: 'admin',
        });
    } catch (error) {
        // Captura y maneja cualquier error que ocurra durante la creación del admin
        // En caso de error, logueamos el error mínimo sin detalles innecesarios
        console.error('Error al crear el usuario admin:', error.message);
    }
};
// Llama a la función para crear el administrador
createAdmin();