// Importa la configuración de la base de datos (sequelize).
const sequelize = require("../config/database");

// Importa los modelos de la base de datos.
const User = require("./User");
const Escultor = require("./Escultor");
const Escultura = require("./Escultura");
const Evento = require("./Evento");
const Qr = require("./Qr");
const Voto = require("./Voto");

// Relaciones entre los modelos de la base de datos:

// 1. Un 'User' tiene un solo 'Escultor' (relación uno a uno).
User.hasOne(Escultor, { as: "escultor", foreignKey: "userId", onDelete: "CASCADE" });
// 2. Un 'Escultor' pertenece a un 'User' (relación inversa).
Escultor.belongsTo(User, { as: "usuario", foreignKey: "userId", onDelete: "CASCADE" });

// 3. Un 'Escultor' tiene una 'Escultura' (relación uno a uno).
Escultor.hasOne(Escultura, { as: "escultura", foreignKey: "userId", onDelete: "CASCADE" });
// 4. Una 'Escultura' pertenece a un 'Escultor' (relación inversa).
Escultura.belongsTo(Escultor, { as: "escultor", foreignKey: "userId", onDelete: "CASCADE" });

// 5. Un 'Evento' tiene muchas 'Escultura' (relación uno a muchos).
Evento.hasMany(Escultura, { foreignKey: "eventoId", as: "esculturas" });
// 6. Una 'Escultura' pertenece a un 'Evento' (relación inversa).
Escultura.belongsTo(Evento, { foreignKey: "eventoId", as: "evento" });

// 7. Un 'User' tiene muchos 'Voto' (relación uno a muchos).
User.hasMany(Voto, { foreignKey: "userId", as: "votos" });

// 8. Un 'Voto' pertenece a un 'User' (relación inversa).
Voto.belongsTo(User, { foreignKey: "userId", as: "usuario" });

// 9. Una 'Escultura' tiene muchos 'Voto' (relación uno a muchos).
Escultura.hasMany(Voto, { foreignKey: "esculturaId", as: "votos" });

// 10. Un 'Voto' pertenece a una 'Escultura' (relación inversa).
Voto.belongsTo(Escultura, { foreignKey: "esculturaId", as: "escultura" });

// 11. Un 'Escultor' tiene muchos 'Voto' (relación uno a muchos).
Escultor.hasMany(Voto, { foreignKey: "escultorId", as: "votosEscultor" });

// 12. Un 'Voto' pertenece a un 'Escultor' (relación inversa).
Voto.belongsTo(Escultor, { foreignKey: "escultorId", as: "escultor" });

// 13. Una escultura tiene un codigo QR.
Escultura.hasOne(Qr, { as: "codigoQR", foreignKey: "esculturaId", onDelete: "CASCADE" });
// 14. Un codigo Qr pertenece a una escultura.
Qr.belongsTo(Escultura, { as: "escultura", foreignKey: "esculturaId" });

// Exporta todos los modelos y sequelize para que puedan ser utilizados en otras partes de la aplicación.
module.exports = { Voto, Qr, sequelize, User, Escultor, Escultura, Evento };