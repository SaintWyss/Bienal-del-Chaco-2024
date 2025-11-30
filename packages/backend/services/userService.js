/**
 * Class: UserService
 * Responsibilities:
 * - Handle business logic for User (Create, Read, Update, Delete).
 * - Handle password hashing and Escultor synchronization.
 * Collaborators:
 * - User (Model)
 * - Escultor (Model)
 * - bcrypt (Library)
 */
const { User, Escultor } = require("../models");
const bcrypt = require("bcrypt");

class UserService {
    async getAllUsers(limit = 10, offset = 0) {
        return await User.findAll({
            attributes: ["id", "username", "email", "role", "isActive", "expiryDate"],
            limit,
            offset,
        });
    }

    async createUser(userData) {
        const { nombre, username, email, password, role, isActive } = userData;

        const user = User.build({
            nombre,
            username,
            email,
            password,
            role: role || "user",
            isActive: isActive !== undefined ? isActive : true,
        });

        await this.processUserData(user);
        await user.save();
        return user;
    }

    async getUserById(id) {
        const user = await User.findByPk(id, {
            attributes: ["id", "username", "email", "role", "isActive", "expiryDate"],
        });

        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        return user;
    }

    async updateUser(id, updateData) {
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        const { role, isActive, password } = updateData;

        if (role) user.role = role;
        if (isActive !== undefined) user.isActive = isActive;
        if (password) user.password = password;

        await this.processUserData(user);
        await user.save();
        return user;
    }

    async deleteUser(id) {
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        await user.destroy();
    }

    async processUserData(user) {
        if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }

        if (user.changed("isActive") && user.id) {
             await Escultor.update(
                { isActive: user.isActive },
                { where: { userId: user.id } }
            );
        }
    }
}

module.exports = new UserService();