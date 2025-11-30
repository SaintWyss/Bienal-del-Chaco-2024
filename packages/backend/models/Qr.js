// Importamos los tipos necesarios de Sequelize y la configuración de la base de datos.
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definimos el modelo 'Qr', que representa la tabla 'Qrs' en la base de datos.
const Qr = sequelize.define(
    "Qr",
    {
        // Campo ID con UUID para mayor estandarización.
        id: {
            type: DataTypes.INTEGER,     // Tipo de dato INTEGER para el ID
            primaryKey: true,            // Es la clave primaria
            autoIncrement: true,  // Define este campo como la clave primaria
        },

        // Relación con Esculturas.
        esculturaId: {
            type: DataTypes.INTEGER, // UUID para mantener consistencia con el modelo 'Escultura'.
            allowNull: false, // No puede ser nulo.
            references: {
                model: "Esculturas", // Relacionado con la tabla 'Esculturas'.
                key: "id", // Clave primaria en 'Esculturas'.
            },
            onDelete: "CASCADE", // Eliminar en cascada si la escultura es eliminada.
        },

        // Código único del QR.
        uniqueCode: {
            type: DataTypes.STRING, // Cadena de texto.
            allowNull: false, // No puede ser nulo.
            unique: true, // Debe ser único.
            validate: {
                isAlphanumeric: true, // Validación opcional para que sea alfanumérico.
                len: [8, 50], // Longitud mínima y máxima del código.
            },
        },

        // Fecha de expiración del código QR.
        expiration: {
            type: DataTypes.DATE, // Tipo de dato: fecha.
            allowNull: false, // Este campo no puede ser nulo.
        },
    },
    {
        tableName: "Qrs", // Nombre explícito de la tabla.
        timestamps: true, // Activa los campos 'createdAt' y 'updatedAt'.
    }
);

// Exportamos el modelo para usarlo en otras partes de la aplicación.
module.exports = Qr;