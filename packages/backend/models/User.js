/**
 * Class: User
 * Responsibilities:
 * - Represent the User entity in the database.
 * - Define schema and validation for user data.
 * Collaborators:
 * - Sequelize
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user', 'escultor'),
        allowNull: false,
        defaultValue: 'user',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'Users',
});

module.exports = User;