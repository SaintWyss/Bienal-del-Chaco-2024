/**
 * Script: CreateUser
 * Responsibilities:
 * - Create sample Users.
 * Collaborators:
 * - User (Model)
 * - bcrypt
 */
const bcrypt = require('bcrypt');
const User = require('../models/User');

const createUsers = async () => {
    try {
        const users = [
            { nombre: 'Malena', username: 'karin', password: 'karin', email: 'karin@gmail.com', role: 'user' },
            { nombre: 'Manuel', username: 'manu', password: 'manu', email: 'manu@gmail.com', role: 'user' },
            { nombre: 'Zaira', username: 'zai', password: 'zai', email: 'zai@gmail.com', role: 'user' },
            { nombre: 'Amilcar', username: 'amil', password: 'amil', email: 'amil@gmail.com', role: 'user' },
            { nombre: 'Santiago', username: 'santi', password: 'santi', email: 'santi@gmail.com', role: 'user' },
            { nombre: 'Sol', username: 'sol', password: 'sol', email: 'sol@gmail.com', role: 'user' },
        ];

        for (const userData of users) {
            const existingUser = await User.findOne({ where: { username: userData.username } });

            if (existingUser) continue;

            const hashedPassword = await bcrypt.hash(userData.password, 10);

            await User.create({
                ...userData,
                password: hashedPassword,
            });
        }
        console.log("Users created successfully.");
    } catch (error) {
        console.error('Error creating users:', error);
    }
};

createUsers();