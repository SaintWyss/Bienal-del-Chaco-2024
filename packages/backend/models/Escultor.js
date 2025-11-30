// Importamos los tipos necesarios desde Sequelize y la configuración de la base de datos
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos
const User = require('./User'); // Importamos el modelo de Usuario

// Definimos el modelo de 'Escultor' utilizando Sequelize
const Escultor = sequelize.define('Escultor', {
    // Definimos el campo 'userId' que referencia al modelo 'User'
    userId: {
        type: DataTypes.INTEGER, // Tipo de dato: entero
        primaryKey: true, // Esta columna es la clave primaria
        allowNull: false, // No puede ser nulo
        unique: true, // Este valor debe ser único
        references: {
            model: User, // Establecemos que referencia al modelo 'User'
            key: 'id', // La clave que se usa en el modelo 'User' es 'id'
        },
        onUpdate: 'CASCADE', // Si el 'User' se actualiza, se actualiza automáticamente en 'Escultor'
        onDelete: 'SET NULL', // Si el 'User' es eliminado, el 'userId' en 'Escultor' será nulo
    },
    // Definimos el campo 'biografia' para almacenar información adicional sobre el escultor
    biografia: {
        type: DataTypes.TEXT, // Tipo de dato: texto largo
        allowNull: true, // Este campo es opcional
    },
    // Definimos el campo 'imagen' para almacenar la URL de la imagen del escultor
    imagen: {
        type: DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: true, // Este campo es opcional
        defaultValue: 'https://default-avatar.com/imagen.png', // Valor por defecto en caso de no proporcionar una imagen
    },
    // Definimos el campo 'puntuacionTotal' que representa la puntuación del escultor
    puntuacionTotal: {
        type: DataTypes.INTEGER, // Tipo de dato: entero
        allowNull: false, // No puede ser nulo
        defaultValue: 0, // Valor por defecto es 0
    },
    // Definimos los campos de redes sociales, todos opcionales
    instagram: {
        type: DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: true, // Este campo es opcional
    },
    facebook: {
        type: DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: true, // Este campo es opcional
    },
    youtube: {
        type: DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: true, // Este campo es opcional
    },
    linkedin: {
        type: DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: true, // Este campo es opcional
    },
}, {
    timestamps: true, // Habilitamos los campos 'createdAt' y 'updatedAt'
    tableName: 'Escultors', // Especificamos el nombre de la tabla en la base de datos
});

// Exportamos el modelo para que sea utilizado en otras partes del proyecto
module.exports = Escultor;