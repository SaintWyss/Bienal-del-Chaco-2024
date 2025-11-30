/**
 * Module: ValidationUtils
 * Responsibilities:
 * - Validate email format.
 * - Validate non-empty strings.
 * Collaborators:
 * - None
 */
const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isNonEmptyString = (value) => {
    return typeof value === "string" && value.trim().length > 0;
};

module.exports = {
    isEmailValid,
    isNonEmptyString,
};