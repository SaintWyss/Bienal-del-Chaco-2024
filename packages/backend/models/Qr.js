/**
 * Class: Qr
 * Responsibilities:
 * - Represent the Qr entity in the database.
 * - Define schema and validation for QR codes.
 * Collaborators:
 * - Sequelize
 */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Qr = sequelize.define(
    "Qr",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        esculturaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Esculturas",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        uniqueCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                len: [8, 50],
            },
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "Qrs",
        timestamps: true,
    }
);

module.exports = Qr;