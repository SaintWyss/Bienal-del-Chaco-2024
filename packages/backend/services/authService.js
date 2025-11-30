/**
 * Class: AuthService
 * Responsibilities:
 * - Handle user registration logic including validation and hashing.
 * - Handle user login logic including validation and token generation.
 * Collaborators:
 * - User (Model)
 * - bcryptjs (Library)
 * - jwt (Utility)
 */
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { generateToken } = require("../utils/jwt");

class AuthService {
    async register(userData) {
        const { nombre, username, email, password, role } = userData;

        if (!nombre || !username || !email || !password) {
            throw new Error("MISSING_FIELDS");
        }

        const userExists = await User.findOne({ where: { username } });
        if (userExists) {
            throw new Error("USER_ALREADY_EXISTS");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nombre,
            username,
            email,
            password: hashedPassword,
            role: role || "user",
            isActive: true,
        });

        return {
            id: newUser.id,
            username: newUser.username,
            role: newUser.role
        };
    }

    async login(credentials) {
        const { username, password } = credentials;

        if (!username || !password) {
            throw new Error("MISSING_FIELDS");
        }

        const user = await User.findOne({ where: { username } });
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = generateToken({
            id: user.id,
            username: user.username,
            role: user.role,
        });

        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            }
        };
    }
}

module.exports = new AuthService();
