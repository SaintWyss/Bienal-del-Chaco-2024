/**
 * Module: AuthMiddleware
 * Responsibilities:
 * - Verify JWT token in request headers.
 * - Attach decoded user to request object.
 * Collaborators:
 * - jsonwebtoken
 */
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token missing or invalid" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authenticateToken;