const { Escultor, User } = require("../models");

// Función para crear un escultor
const crearEscultor = async (req, res) => {
    try {
        // Desestructurar los datos de la solicitud
        const { userId, biografia, imagen, instagram, facebook, youtube, linkedin } = req.body;

        // Verificar si el usuario existe en la base de datos
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Crear un escultor asociado al usuario
        const escultor = await Escultor.create({
            userId: user.id, // Este campo es obligatorio
            biografia: biografia || null, // Opcional, se establece en null si no se proporciona
            imagen: imagen || "https://example.com/imagen-defecto.png", // Imagen por defecto si no se proporciona
            puntuacionTotal: 0, // Puntuación inicial fija
            instagram: instagram || null, // Opcional
            facebook: facebook || null, // Opcional
            youtube: youtube || null, // Opcional
            linkedin: linkedin || null, // Opcional
        });

        // Responder con éxito
        res.status(201).json({ message: "Escultor creado exitosamente", escultor });
    } catch (error) {
        // Manejo de errores mínimo
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};


// Función para obtener todos los escultores
const obtenerEscultores = async (req, res) => {
    try {
        // Obtener todos los escultores con los detalles del usuario relacionado
        const escultores = await Escultor.findAll({
            include: [{
                model: User,
                as: 'usuario',
                attributes: ['id', 'nombre', 'username', 'email', 'role'],
            }],
            raw: true, // Evitar que Sequelize transforme la respuesta a objetos anidados
        });

        // Devolver la lista de escultores
        res.json(escultores);
    } catch (error) {
        // Manejo de errores mínimo
        res.status(500).json({ message: 'Error al obtener escultores' });
    }
};

// Función para obtener un escultor por su ID
const obtenerEscultorPorId = async (req, res) => {
    try {
        // Obtener el ID del parámetro de la solicitud
        const { id } = req.params;

        // Buscar el escultor por userId
        const escultor = await Escultor.findOne({
            where: { userId: id },
            include: [{
                model: User,
                as: 'usuario',
                attributes: ['nombre', 'username', 'email', 'role'],
            }],
        });

        if (!escultor) {
            return res.status(404).json({ message: 'Escultor no encontrado' });
        }

        // Devolver el escultor encontrado
        res.json(escultor);
    } catch (error) {
        // Manejo de errores mínimo
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Función para actualizar un escultor por su ID
const actualizarEscultor = async (req, res) => {
    try {
        // Obtener el ID del parámetro y los datos de la solicitud
        const { id } = req.params;
        const { biografia, imagen, puntuacionTotal, instagram, facebook, youtube, linkedin } = req.body;

        // Buscar el escultor por userId
        const escultor = await Escultor.findOne({ where: { userId: id } });
        if (!escultor) {
            return res.status(404).json({ message: "Escultor no encontrado" });
        }

        // Actualizar los datos del escultor
        await escultor.update({
            biografia,
            imagen,
            puntuacionTotal,
            instagram,
            facebook,
            youtube,
            linkedin,
        });

        // Responder con éxito
        res.status(200).json({ message: "Escultor actualizado exitosamente", escultor });
    } catch (error) {
        // Manejo de errores mínimo
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para eliminar un escultor por su ID
const eliminarEscultor = async (req, res) => {
    try {
        // Obtener el ID del parámetro de la solicitud
        const { id } = req.params;

        // Buscar el escultor por userId
        const escultor = await Escultor.findOne({ where: { userId: id } });
        if (!escultor) {
            return res.status(404).json({ message: "Escultor no encontrado" });
        }

        // Eliminar el escultor de la base de datos
        await escultor.destroy();
        res.status(200).json({ message: "Escultor eliminado exitosamente" });
    } catch (error) {
        // Manejo de errores mínimo
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    crearEscultor,
    obtenerEscultores,
    obtenerEscultorPorId,
    actualizarEscultor,
    eliminarEscultor,
};