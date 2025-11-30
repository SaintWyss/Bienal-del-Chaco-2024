/**
 * Module: Models Index
 * Responsibilities:
 * - Initialize and export all database models.
 * - Define associations between models.
 * Collaborators:
 * - Sequelize
 * - User, Escultor, Escultura, Evento, Qr, Voto (Models)
 */
const sequelize = require("../config/database");

const User = require("./User");
const Escultor = require("./Escultor");
const Escultura = require("./Escultura");
const Evento = require("./Evento");
const Qr = require("./Qr");
const Voto = require("./Voto");

// Associations
User.hasOne(Escultor, { as: "escultor", foreignKey: "userId", onDelete: "CASCADE" });
Escultor.belongsTo(User, { as: "usuario", foreignKey: "userId", onDelete: "CASCADE" });

Escultor.hasOne(Escultura, { as: "escultura", foreignKey: "userId", onDelete: "CASCADE" });
Escultura.belongsTo(Escultor, { as: "escultor", foreignKey: "userId", onDelete: "CASCADE" });

Evento.hasMany(Escultura, { foreignKey: "eventoId", as: "esculturas" });
Escultura.belongsTo(Evento, { foreignKey: "eventoId", as: "evento" });

User.hasMany(Voto, { foreignKey: "userId", as: "votos" });
Voto.belongsTo(User, { foreignKey: "userId", as: "usuario" });

Escultura.hasMany(Voto, { foreignKey: "esculturaId", as: "votos" });
Voto.belongsTo(Escultura, { foreignKey: "esculturaId", as: "escultura" });

Escultor.hasMany(Voto, { foreignKey: "escultorId", as: "votosEscultor" });
Voto.belongsTo(Escultor, { foreignKey: "escultorId", as: "escultor" });

Escultura.hasOne(Qr, { as: "codigoQR", foreignKey: "esculturaId", onDelete: "CASCADE" });
Qr.belongsTo(Escultura, { as: "escultura", foreignKey: "esculturaId" });

module.exports = { Voto, Qr, sequelize, User, Escultor, Escultura, Evento };