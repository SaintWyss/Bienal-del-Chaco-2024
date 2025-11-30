// Importamos los tipos de datos necesarios de Sequelize
const { DataTypes } = require("sequelize");
// Importamos la configuración de la base de datos
const sequelize = require("../config/database");

// Definimos el modelo 'Evento' utilizando Sequelize
const Evento = sequelize.define("Evento", {
    // Definición del campo 'id', tipo INTEGER, clave primaria y autoincremental
    id: {
        type: DataTypes.INTEGER,     // Tipo de dato INTEGER para el ID
        primaryKey: true,            // Es la clave primaria
        autoIncrement: true,         // Se auto-incrementa con cada nuevo evento
    },
    // Definición del campo 'nombre', de tipo STRING, no puede ser nulo
    nombre: {
        type: DataTypes.STRING,      // Tipo de dato STRING para el nombre del evento
        allowNull: false,            // El campo 'nombre' no puede ser nulo
    },
    // Definición del campo 'tematica', también de tipo STRING, no puede ser nulo
    tematica: {
        type: DataTypes.STRING,      // Tipo de dato STRING para la temática del evento
        allowNull: false,            // El campo 'tematica' no puede ser nulo
    },
    // Definición del campo 'descripcion', de tipo TEXT, es opcional (puede ser nulo)
    descripcion: {
        type: DataTypes.TEXT,        // Tipo de dato TEXT para una descripción más larga
        allowNull: true,             // El campo 'descripcion' puede ser nulo
    },
    // Definición de la fecha de inicio, tipo DATE, es opcional
    fechaInc: {
        type: DataTypes.DATE,        // Tipo de dato DATE para la fecha de inicio
        allowNull: true,             // Puede ser nula si no se especifica la fecha de inicio
    },
    // Definición de la fecha de fin, también tipo DATE, opcional
    fechaFin: {
        type: DataTypes.DATE,        // Tipo de dato DATE para la fecha de fin
        allowNull: true,             // Puede ser nula si no se especifica la fecha de fin
    },
    // Definición del campo 'imagen', tipo STRING, opcional (puede ser nulo)
    imagen: {
        type: DataTypes.STRING,      // Tipo de dato STRING para almacenar un enlace de imagen
        allowNull: true,             // Puede ser nulo si no se proporciona una imagen
    },
}, {
    // Configuración adicional para manejar las fechas de creación y actualización
    timestamps: true,              // Sequelize manejará automáticamente 'createdAt' y 'updatedAt'
    createdAt: "createdAt",        // Definimos el nombre del campo 'createdAt' para la fecha de creación
    updatedAt: "updatedAt",        // Definimos el nombre del campo 'updatedAt' para la fecha de actualización
});

// Exportamos el modelo 'Evento' para poder usarlo en otras partes del código
module.exports = Evento;