/**
 * Task: DeactivateExpiredUsers
 * Responsibilities:
 * - Deactivate users whose expiry date has passed.
 * Collaborators:
 * - User (Model)
 * - Sequelize Op
 */
const { User } = require("../models");
const { Op } = require("sequelize");

const deactivateExpiredUsers = async () => {
    try {
        const now = new Date();

        await User.update(
            { isActive: false },
            {
                where: {
                    expiryDate: {
                        [Op.lt]: now,
                    },
                    isActive: true,
                },
            }
        );
    } catch (error) {
        console.error("Error deactivating expired users:", error.message || error);
    }
};

module.exports = deactivateExpiredUsers;