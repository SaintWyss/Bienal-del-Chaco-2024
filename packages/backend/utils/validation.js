// Función para validar un correo electrónico
const isEmailValid = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Retorna true si el correo electrónico es válido, false en caso contrario
    return emailRegex.test(email);
};

// Función para validar que una cadena no esté vacía
const isNonEmptyString = (value) => {
    // Verifica que el valor sea una cadena no vacía
    return typeof value === "string" && value.trim().length > 0;
};

// Exportación de las funciones para ser utilizadas en otros módulos
module.exports = {
    isEmailValid,
    isNonEmptyString,
};