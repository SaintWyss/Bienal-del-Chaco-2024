// Requiriendo el módulo bcrypt para la encriptación de contraseñas y el modelo Escultor
const bcrypt = require('bcrypt');
const { Escultor } = require('../models');

// Middleware para encriptar contraseñas de usuario
/**
 * Este middleware encripta la contraseña del usuario antes de almacenarla en la base de datos.
 * @param {Object} user - El objeto del usuario que contiene la contraseña a encriptar.
 */
const hashPassword = async (user) => {
    // Si el usuario tiene una contraseña, se procede a encriptarla
    if (user.password) {
        // Genera una sal de 10 rondas para la encriptación de la contraseña
        const salt = await bcrypt.genSalt(10);
        // Encripta la contraseña usando bcrypt
        user.password = await bcrypt.hash(user.password, salt);
    }
};

// Middleware para sincronizar el estado de "isActive" en el modelo Escultor
/**
 * Este middleware asegura que el estado de 'isActive' del usuario se refleje en el modelo Escultor.
 * @param {Object} user - El objeto del usuario que contiene el estado 'isActive'.
 */
const syncIsActive = async (user) => {
    // Si 'isActive' está definido en el objeto 'user', se actualiza en el modelo Escultor
    if (user.isActive !== undefined) {
        // Se actualiza el campo 'isActive' en el modelo Escultor relacionado con el usuario
        await Escultor.update(
            { isActive: user.isActive }, // Nuevo valor de 'isActive'
            { where: { userId: user.id } } // Condición para encontrar el Escultor correspondiente
        );
    }
};

// Función genérica para aplicar los middlewares de creación y actualización de usuarios
/**
 * Aplica los middlewares necesarios antes de crear o actualizar un usuario.
 * @param {Object} user - El objeto del usuario a procesar.
 */
const processUserData = async (user) => {
    // Encripta la contraseña si es necesario
    await hashPassword(user);
    // Sincroniza el estado 'isActive' en el modelo Escultor si es necesario
    await syncIsActive(user);
};

// Exportando las funciones para que puedan ser utilizadas en otros archivos
module.exports = {
    processUserData, // Función para procesar los datos del usuario
    hashPassword,    // Función para encriptar la contraseña
    syncIsActive,    // Función para sincronizar 'isActive' con el modelo Escultor
};