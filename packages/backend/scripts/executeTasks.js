// Importación de las tareas que se ejecutarán
const cleanExpiredQr = require("../tasks/cleanExpiredQr");
const deactivateExpiredUsers = require("../tasks/deactivateExpiredUsers");
const deleteExpiredUsers = require("../tasks/deleteExpiredUsers");

// Función principal para ejecutar las tareas
const executeTasks = async () => {
    try {
        // Mensaje de inicio de la ejecución
        console.log("Ejecutando tareas manualmente...");

        // Ejecutar la tarea para limpiar los QR expirados
        await cleanExpiredQr();

        // Ejecutar la tarea para desactivar usuarios expirados
        await deactivateExpiredUsers();

        // Ejecutar la tarea para eliminar usuarios expirados
        await deleteExpiredUsers();

        // Mensaje indicando que todas las tareas se completaron
        console.log("Tareas completadas.");
    } catch (error) {
        // Captura cualquier error y muestra un mensaje genérico de error
        console.error("Hubo un error al ejecutar las tareas: ", error);
    }
};

// Ejecutar la función
executeTasks();

// Instrucción para ejecutar este script:
// node scripts/executeTasks.js