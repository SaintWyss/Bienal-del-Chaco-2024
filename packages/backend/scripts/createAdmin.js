/**
 * Script: CreateAdmin
 * Responsibilities:
 * - Create an initial admin user if not exists.
 * Collaborators:
 * - User (Model)
 * - bcrypt
 */
const User = require('../models/User');
const bcrypt = require("bcrypt");

const createAdmin = async () => {
    try {
        const existingUser = await User.findOne({ where: { username: process.env.ADMIN_USERNAME } });

        if (existingUser) {
            return;
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        await User.create({
            nombre: process.env.ADMIN_USERNAME,
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: 'admin',
        });
    } catch (error) {
        console.error('Error creating admin user:', error.message);
    }
};

createAdmin();