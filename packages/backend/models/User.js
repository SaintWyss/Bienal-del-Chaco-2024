// Importamos los elementos necesarios de Sequelize para definir el modelo
const { DataTypes } = require('sequelize');
// Importamos la configuración de la base de datos para conectarnos a PostgreSQL
const sequelize = require('../config/database');

// Definimos el modelo 'User' usando sequelize
const User = sequelize.define('User', {
    // ID del usuario: entero, clave primaria, autoincremental
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Marca este campo como la clave primaria
        autoIncrement: true, // El valor se incrementa automáticamente con cada nuevo usuario
    },

    // Nombre del usuario: cadena de texto no nula
    nombre: {
        type: DataTypes.STRING,
        allowNull: false, // Este campo no puede ser nulo
    },

    // Nombre de usuario: cadena única, no puede ser nula
    username: {
        type: DataTypes.STRING,
        allowNull: false, // Este campo no puede ser nulo
        unique: true, // Este campo debe ser único en la base de datos
    },

    // Contraseña: cadena de texto, no puede ser nula
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Este campo no puede ser nulo
    },

    // Rol del usuario: puede ser 'admin', 'user', o 'escultor', no puede ser nulo
    role: {
        type: DataTypes.ENUM('admin', 'user', 'escultor'),
        allowNull: false, // Este campo no puede ser nulo
        defaultValue: 'user', // Valor predeterminado es 'user'
    },

    // Correo electrónico: cadena de texto única, debe ser un email válido, no puede ser nulo
    email: {
        type: DataTypes.STRING,
        allowNull: false, // Este campo no puede ser nulo
        unique: true, // Este campo debe ser único en la base de datos
        validate: {
            isEmail: true, // Verifica que el valor sea un correo electrónico válido
        },
    },

    // Estado de la cuenta: booleano, valor por defecto es verdadero (activo)
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Valor predeterminado es 'true', indicando que el usuario está activo
    },

    // Fecha de expiración: puede ser nula, si se necesita asignar una fecha límite
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: true, // Este campo puede ser nulo
    },
}, {
    // Configuraciones adicionales del modelo
    timestamps: true, // Agrega automáticamente los campos 'createdAt' y 'updatedAt'
    tableName: 'Users', // Define el nombre de la tabla en la base de datos
});

// Exportamos el modelo User para usarlo en otras partes de la aplicación
module.exports = User;