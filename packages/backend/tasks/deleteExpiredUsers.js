/**
 * Task: DeleteExpiredUsers
 * Responsibilities:
 * - Delete users who are expired and inactive.
 * Collaborators:
 * - User (Model)
 * - Sequelize Op
 */
const { User } = require("../models");
const { Op } = require("sequelize");

const deleteExpiredUsers = async () => {
    try {
        const now = new Date();

        await User.destroy({
            where: {
                expiryDate: {
                    [Op.lt]: now,
                },
                isActive: false,
            },
        });
    } catch (error) {
        console.error("Error deleting expired users:", error);
    }
};

module.exports = deleteExpiredUsers;
