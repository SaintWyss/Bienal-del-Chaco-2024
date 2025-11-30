// Importar bcrypt para encriptar las contraseñas
const bcrypt = require('bcrypt');
// Importar el modelo de usuario para interactuar con la base de datos
const User = require('../models/User'); // Ajusta la ruta según tu estructura

// Función principal para crear usuarios
const createUsers = async () => {
    try {
        // Lista de usuarios a crear
        const users = [
            { nombre: 'Malena', username: 'karin', password: 'karin', email: 'karin@gmail.com', role: 'user' },
            { nombre: 'Manuel', username: 'manu', password: 'manu', email: 'manu@gmail.com', role: 'user' },
            { nombre: 'Zaira', username: 'zai', password: 'zai', email: 'zai@gmail.com', role: 'user' },
            { nombre: 'Amilcar', username: 'amil', password: 'amil', email: 'amil@gmail.com', role: 'user' },
            { nombre: 'Santiago', username: 'santi', password: 'santi', email: 'santi@gmail.com', role: 'user' },
            { nombre: 'Sol', username: 'sol', password: 'sol', email: 'sol@gmail.com', role: 'user' },
        ];

        // Recorrer la lista de usuarios
        for (const userData of users) {
            // Verificar si el usuario ya existe en la base de datos
            const existingUser = await User.findOne({ where: { username: userData.username } });

            // Si el usuario existe, se salta a la siguiente iteración
            if (existingUser) continue; // No es necesario mostrar un log, ya que no es relevante para la ejecución

            // Encriptar la contraseña del usuario
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // Crear el nuevo usuario en la base de datos con la contraseña encriptada
            await User.create({
                ...userData,
                password: hashedPassword, // Usar la contraseña encriptada
            });
        }
    } catch (error) {
        // Solo capturar el error mínimo necesario, sin logs innecesarios
        console.error('Error al crear los usuarios:', error);
    }
};

// Ejecutar la función de creación de usuarios
createUsers();