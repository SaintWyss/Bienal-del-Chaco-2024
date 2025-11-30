/**
 * Module: Main Entry Point
 * Responsibilities:
 * - Initialize Express application.
 * - Configure middlewares (CORS, JSON, URL-encoded).
 * - Connect to Database.
 * - Register Routes.
 * - Start Server.
 * Collaborators:
 * - Express
 * - Sequelize
 * - Routes
 */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const routes = require("./routes");

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected.");
    })
    .catch((error) => {
        console.error("Database connection error:", error.message || error);
        process.exit(1);
    });

app.use("/api", routes);

if (process.env.NODE_ENV === "development") {
    sequelize
        .sync({ alter: true })
        .catch((error) => {
            console.error("Model sync error:", error.message || error);
        });
}

app.use((err, req, res, next) => {
    console.error("Global error:", err.stack || "Unknown error.");
    res.status(500).json({ error: "Internal Server Error." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
