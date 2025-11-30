/**
 * Class: Escultor
 * Responsibilities:
 * - Represent the Escultor entity in the database.
 * - Define schema and relationships for sculptor data.
 * Collaborators:
 * - Sequelize
 * - User (Model)
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Escultor = sequelize.define('Escultor', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    biografia: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://default-avatar.com/imagen.png',
    },
    puntuacionTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    youtube: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'Escultors',
});

module.exports = Escultor;