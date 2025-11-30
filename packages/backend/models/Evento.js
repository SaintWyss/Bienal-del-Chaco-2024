/**
 * Class: Evento
 * Responsibilities:
 * - Represent the Evento entity in the database.
 * - Define schema for event data.
 * Collaborators:
 * - Sequelize
 */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Evento = sequelize.define("Evento", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tematica: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fechaInc: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
});

module.exports = Evento;