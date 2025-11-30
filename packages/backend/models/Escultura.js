/**
 * Class: Escultura
 * Responsibilities:
 * - Represent the Escultura entity in the database.
 * - Define schema and relationships for sculpture data.
 * Collaborators:
 * - Sequelize
 * - Escultor (Model)
 * - Evento (Model)
 */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Escultura = sequelize.define("Escultura", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    plano: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imagenes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
    },
    imagenFinal: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Escultors',
            key: 'userId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    eventoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Eventos',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}, {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
});

Escultura.associate = (models) => {
    Escultura.belongsTo(models.Escultor, {
        foreignKey: 'userId',
        as: 'escultor',
    });

    Escultura.belongsTo(models.Evento, {
        foreignKey: 'eventoId',
        as: 'evento',
    });
};

module.exports = Escultura;