/**
 * Module: CheckUserStatusMiddleware
 * Responsibilities:
 * - Verify if user is active and not expired.
 * - Cache user status for performance.
 * Collaborators:
 * - User (Model)
 */
const { User } = require("../models");

const userCache = new Map();

const checkUserStatus = async (req, res, next) => {
    try {
        const userId = req.user.id;

        if (userCache.has(userId)) {
            const cachedUser = userCache.get(userId);

            if (!cachedUser.isActive) {
                return res.status(403).json({ message: "User inactive" });
            }

            if (cachedUser.expiryDate && new Date() > new Date(cachedUser.expiryDate)) {
                return res.status(403).json({ message: "User expired" });
            }

            return next();
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        userCache.set(userId, {
            isActive: user.isActive,
            expiryDate: user.expiryDate,
        });
        setTimeout(() => userCache.delete(userId), 60000);

        if (!user.isActive) {
            return res.status(403).json({ message: "User inactive" });
        }

        if (user.expiryDate && new Date() > new Date(user.expiryDate)) {
            return res.status(403).json({ message: "User expired" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = checkUserStatus;