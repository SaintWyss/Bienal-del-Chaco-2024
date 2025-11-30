/**
 * Module: JwtUtils
 * Responsibilities:
 * - Generate JWT tokens.
 * Collaborators:
 * - jsonwebtoken
 */
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        }
    );
};

module.exports = { generateToken };