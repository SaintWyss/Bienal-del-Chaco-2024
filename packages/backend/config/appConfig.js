/**
 * Module: AppConfig
 * Responsibilities:
 * - Export application configuration.
 * Collaborators:
 * - process.env
 */
module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
    JWT_EXPIRATION: process.env.JWT_EXPIRES_IN || '1h',
};