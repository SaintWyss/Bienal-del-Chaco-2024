const { User } = require("../models"); // Importa el modelo User
const { Op } = require("sequelize");  // Importa los operadores de Sequelize

// Función para desactivar usuarios cuya fecha de expiración ha pasado
const deactivateExpiredUsers = async () => {
    try {
        const now = new Date(); // Obtiene la fecha y hora actual

        // Actualiza los usuarios cuya fecha de expiración ya ha pasado y están activos
        const result = await User.update(
            { isActive: false }, // Cambia el estado `isActive` a `false` (desactiva al usuario)
            {
                where: {
                    expiryDate: {
                        [Op.lt]: now, // Compara la fecha de expiración con la fecha actual (menor a la fecha actual)
                    },
                    isActive: true, // Asegura que solo se desactiven los usuarios activos
                },
            }
        );

        // Solo se deja el mínimo en caso de éxito, se puede registrar el número de usuarios actualizados
        // Esto es útil solo si se requiere algún tipo de validación de ejecución, pero puedes eliminarlo si no es necesario
        // console.log(`Tarea completada: ${result[0]} usuarios expirados desactivados.`);

    } catch (error) {
        // Manejo de errores, solo dejando un mensaje simple y sin detalles innecesarios
        console.error("Error al desactivar usuarios expirados:", error.message || error);
    }
};

// Exporta la función para usarla en otras partes del proyecto
module.exports = deactivateExpiredUsers;