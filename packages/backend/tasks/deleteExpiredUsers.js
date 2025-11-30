// Importación de los modelos necesarios
const { User } = require("../models");
const { Op } = require("sequelize");

// Función para eliminar usuarios expirados e inactivos
const deleteExpiredUsers = async () => {
    try {
        // Obtener la fecha actual
        const now = new Date();

        // Realizar la eliminación de usuarios que cumplan las condiciones:
        // 1. Su fecha de expiración es menor a la fecha actual.
        // 2. Su campo isActive es false (usuarios inactivos).
        const result = await User.destroy({
            where: {
                expiryDate: {
                    [Op.lt]: now, // Comparar la fecha de expiración con la fecha actual
                },
                isActive: false, // Solo eliminar usuarios que están inactivos
            },
        });

        // Solo loguear el resultado en caso de que sea necesario (para producción, puedes eliminar esta línea si no es esencial).
        if (result > 0) {
            console.log(`Tarea completada: ${result} usuarios expirados eliminados.`);
        }
    } catch (error) {
        // Manejo de errores: si algo falla, loguear el error
        console.error("Error al eliminar usuarios expirados:", error);
    }
};

// Exportar la función para poder usarla en otros archivos
module.exports = deleteExpiredUsers;
