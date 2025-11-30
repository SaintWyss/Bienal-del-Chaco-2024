// Importa los tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Importa la instancia de conexión con la base de datos configurada
const sequelize = require("../config/database");

// Define el modelo de Escultura con sus atributos
const Escultura = sequelize.define("Escultura", {
    id: {
        type: DataTypes.INTEGER, // Tipo de dato entero para el ID
        primaryKey: true, // Define este campo como clave primaria
        autoIncrement: true, // El valor del ID se incrementará automáticamente
    },
    nombre: {
        type: DataTypes.STRING, // Tipo de dato cadena para el nombre de la escultura
        allowNull: false, // No puede ser nulo
    },
    descripcion: {
        type: DataTypes.TEXT, // Tipo de dato texto para la descripción
        allowNull: true, // Puede ser nulo, ya que no es obligatorio
    },
    plano: {
        type: DataTypes.STRING, // Tipo de dato cadena para la URL del plano inicial
        allowNull: true, // Puede ser nulo
    },
    imagenes: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Tipo de dato arreglo de cadenas (URLs de imágenes)
        allowNull: true, // Puede ser nulo, ya que no es obligatorio
        defaultValue: [], // Valor por defecto: un arreglo vacío
    },
    imagenFinal: {
        type: DataTypes.STRING, // Tipo de dato cadena para la URL de la imagen final
        allowNull: true, // Puede ser nulo, ya que no es obligatorio
    },
    fechaCreacion: {
        type: DataTypes.DATE, // Tipo de dato fecha para la fecha de creación
        allowNull: true, // No puede ser nulo
    },
    puntuacion: {
        type: DataTypes.INTEGER, // Tipo de dato entero para la puntuación de la escultura
        allowNull: false, // No puede ser nulo
        defaultValue: 0, // Valor por defecto de la puntuación: 0
    },
    userId: { // Relación con el usuario del escultor
        type: DataTypes.INTEGER, // Tipo de dato entero para el ID del usuario
        allowNull: false, // No puede ser nulo
        references: {
            model: 'Escultors', // Especifica que este campo hace referencia al modelo 'Escultors'
            key: 'userId', // Se refiere a la clave primaria 'userId' de la tabla Escultor
        },
        onUpdate: 'CASCADE', // Si se actualiza el usuario, se actualiza el userId en Escultura
        onDelete: 'SET NULL', // Si se elimina el usuario, el userId en Escultura se establece en NULL
    },
    eventoId: { // Relación con la tabla de eventos
        type: DataTypes.INTEGER, // Tipo de dato entero para el ID del evento
        allowNull: true, // Puede ser nulo, ya que no es obligatorio
        references: {
            model: 'Eventos', // Especifica que este campo hace referencia al modelo 'Eventos'
            key: 'id', // Se refiere a la clave primaria 'id' de la tabla Evento
        },
        onUpdate: 'CASCADE', // Si se actualiza el evento, se actualiza el eventoId en Escultura
        onDelete: 'SET NULL', // Si se elimina el evento, el eventoId en Escultura se establece en NULL
    },
}, {
    timestamps: true, // Se activan los timestamps (createdAt y updatedAt) automáticamente
    createdAt: "createdAt", // Nombre del campo para la fecha de creación
    updatedAt: "updatedAt", // Nombre del campo para la fecha de actualización
});

// Relación con otros modelos (Escultor y Evento)
Escultura.associate = (models) => {
    // La escultura pertenece a un escultor, usando el campo 'userId' como clave externa
    Escultura.belongsTo(models.Escultor, {
        foreignKey: 'userId',
        as: 'escultor', // Alias para la relación
    });

    // La escultura pertenece a un evento, usando el campo 'eventoId' como clave externa
    Escultura.belongsTo(models.Evento, {
        foreignKey: 'eventoId',
        as: 'evento', // Alias para la relación
    });
};

// Exporta el modelo Escultura para que pueda ser usado en otros archivos
module.exports = Escultura;