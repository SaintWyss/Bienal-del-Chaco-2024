/**
 * Class: EscultorService
 * Responsibilities:
 * - Handle business logic for Escultor (Create, Read, Update, Delete).
 * - Validate input data for sculptors.
 * Collaborators:
 * - Escultor (Model)
 * - User (Model)
 */
const { Escultor, User } = require("../models");

class EscultorService {
    async crearEscultor(data) {
        const { userId, biografia, imagen, instagram, facebook, youtube, linkedin } = data;

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        return await Escultor.create({
            userId: user.id,
            biografia: biografia || null,
            imagen: imagen || "https://example.com/imagen-defecto.png",
            puntuacionTotal: 0,
            instagram: instagram || null,
            facebook: facebook || null,
            youtube: youtube || null,
            linkedin: linkedin || null,
        });
    }

    async obtenerEscultores() {
        return await Escultor.findAll({
            include: [{
                model: User,
                as: 'usuario',
                attributes: ['id', 'nombre', 'username', 'email', 'role'],
            }],
            raw: true,
        });
    }

    async obtenerEscultorPorId(userId) {
        const escultor = await Escultor.findOne({
            where: { userId },
            include: [{
                model: User,
                as: 'usuario',
                attributes: ['nombre', 'username', 'email', 'role'],
            }],
        });

        if (!escultor) {
            throw new Error("ESCULTOR_NOT_FOUND");
        }

        return escultor;
    }

    async actualizarEscultor(userId, data) {
        const escultor = await Escultor.findOne({ where: { userId } });
        if (!escultor) {
            throw new Error("ESCULTOR_NOT_FOUND");
        }

        const { biografia, imagen, puntuacionTotal, instagram, facebook, youtube, linkedin } = data;

        return await escultor.update({
            biografia,
            imagen,
            puntuacionTotal,
            instagram,
            facebook,
            youtube,
            linkedin,
        });
    }

    async eliminarEscultor(userId) {
        const escultor = await Escultor.findOne({ where: { userId } });
        if (!escultor) {
            throw new Error("ESCULTOR_NOT_FOUND");
        }

        await escultor.destroy();
        return true;
    }
}

module.exports = new EscultorService();
