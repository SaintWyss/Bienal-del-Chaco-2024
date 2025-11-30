require('dotenv').config(); // Cargar variables de entorno
const { Sequelize } = require('sequelize');

// Crear instancia de Sequelize
const sequelize = new Sequelize(
    process.env.POSTGRES_DB, // Nombre de la base de datos
    process.env.POSTGRES_USER, // Usuario de la base de datos
    process.env.POSTGRES_PASSWORD, // Contraseña del usuario
    {
        host: process.env.DB_HOST, // Host de la base de datos
        port: process.env.DB_PORT, // Puerto de la base de datos
        dialect: 'postgres', // Dialecto de la base de datos
        dialectOptions: {
            ssl: {
                require: true, // SSL obligatorio para conexiones seguras
                rejectUnauthorized: false, // Evitar errores con certificados autofirmados
            },
        },
        logging: false, // Desactivar logs de Sequelize
        pool: {
            max: 5, // Máximo de conexiones
            min: 0, // Mínimo de conexiones
            acquire: 30000, // Tiempo máximo para adquirir una conexión
            idle: 10000, // Tiempo máximo de inactividad antes de liberar la conexión
        },
    }
);

// Probar conexión a la base de datos
const testConnection = async () => {
    try {
        await sequelize.authenticate(); // Intentar conectar a la base de datos
        console.log('Conexión a la base de datos establecida con éxito.');
    } catch (error) {
        // Manejo básico de errores
        console.error('Error en la conexión a la base de datos:', error.message);
    }
};

testConnection(); // Llamar a la función para probar la conexión

module.exports = sequelize;