/**
 * Class: Voto
 * Responsibilities:
 * - Represent the Voto entity in the database.
 * - Define schema and validation for vote data.
 * Collaborators:
 * - Sequelize
 */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Voto = sequelize.define(
    "Voto",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        puntuacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
    },
    {
        tableName: "Votos",
        timestamps: true,
    }
);

module.exports = Voto;