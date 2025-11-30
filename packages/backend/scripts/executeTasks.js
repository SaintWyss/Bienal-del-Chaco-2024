/**
 * Script: ExecuteTasks
 * Responsibilities:
 * - Execute all maintenance tasks manually.
 * Collaborators:
 * - cleanExpiredQr (Task)
 * - deactivateExpiredUsers (Task)
 * - deleteExpiredUsers (Task)
 */
const cleanExpiredQr = require("../tasks/cleanExpiredQr");
const deactivateExpiredUsers = require("../tasks/deactivateExpiredUsers");
const deleteExpiredUsers = require("../tasks/deleteExpiredUsers");

const executeTasks = async () => {
    try {
        console.log("Executing tasks manually...");

        await cleanExpiredQr();
        await deactivateExpiredUsers();
        await deleteExpiredUsers();

        console.log("Tasks completed.");
    } catch (error) {
        console.error("Error executing tasks: ", error);
    }
};

executeTasks();