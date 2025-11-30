// Importa 'DataTypes' desde Sequelize para definir los tipos de las columnas de la tabla.
const { DataTypes } = require("sequelize");

// Importa la instancia de Sequelize configurada, que conecta con la base de datos.
const sequelize = require("../config/database");

// Define el modelo 'Voto' usando Sequelize.
const Voto = sequelize.define(
    "Voto", // Nombre del modelo que corresponde con la tabla 'Votos' en la base de datos.
    {
        // Definición de las columnas en la tabla 'Votos'.

        id: {
            // La columna 'id' es la clave primaria de la tabla.
            type: DataTypes.INTEGER, // Tipo de datos para la columna 'id'.
            primaryKey: true, // Define esta columna como clave primaria.
            autoIncrement: true, // Se incrementa automáticamente con cada nuevo registro.
        },

        puntuacion: {
            // La columna 'puntuacion' almacena la calificación del voto.
            type: DataTypes.INTEGER, // Tipo de datos para la puntuación (número entero).
            allowNull: false, // No permite que la columna sea nula.
            validate: {
                min: 1, // La puntuación mínima permitida es 1.
                max: 5, // La puntuación máxima permitida es 5.
            },
        },
    },
    {
        tableName: "Votos", // Especifica el nombre de la tabla en la base de datos (en plural).
        timestamps: true, // Añade columnas de fecha de creación y última actualización automáticamente.
    }
);

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación.
module.exports = Voto;