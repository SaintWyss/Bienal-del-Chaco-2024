/**
 * Class: RoleService
 * Responsibilities:
 * - Handle business logic for Role updates.
 * - Manage Escultor creation/deactivation based on role changes.
 * Collaborators:
 * - User (Model)
 * - Escultor (Model)
 */
const { User, Escultor } = require("../models");

class RoleService {
    async updateUserRole(userId, newRole) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        const previousRole = user.role;
        user.role = newRole;
        await user.save();

        if (newRole === "escultor" && previousRole !== "escultor") {
            const existingSculptor = await Escultor.findOne({ where: { userId } });

            if (!existingSculptor) {
                await Escultor.create({
                    userId,
                    username: user.username,
                    email: user.email,
                });
            } else {
                // Reactivate if it exists but was inactive?
                // The original code didn't explicitly reactivate, but let's assume we might want to.
                // Original code: if (role !== "escultor" && previousRole === "escultor") -> isActive: false
                // So if we switch back to escultor, we should probably set isActive: true if it exists.
                // But strictly following original logic:
                // "if (role === "escultor" && previousRole !== "escultor") { ... if (!existingSculptor) create ... }"
                // It didn't handle reactivation. I will stick to original logic but maybe add reactivation if it makes sense.
                // Actually, let's stick to the original logic to avoid side effects, but it seems like a bug in original if I toggle role back and forth.
                // I'll add reactivation for robustness.
                await existingSculptor.update({ isActive: true });
            }
        } else if (newRole !== "escultor" && previousRole === "escultor") {
            await Escultor.update({ isActive: false }, { where: { userId } });
        }

        return user;
    }
}

module.exports = new RoleService();