const { User, Escultor } = require("../models");

// Función para actualizar el rol de un usuario por su ID
const updateUserRole = async (req, res) => {
    try {
        // Extraemos el ID del usuario desde los parámetros de la solicitud
        const { id } = req.params;

        // Extraemos el nuevo rol desde el cuerpo de la solicitud
        const { role } = req.body;

        // Buscamos al usuario por ID en la base de datos
        const user = await User.findByPk(id);

        // Si no se encuentra el usuario, retornamos un error 404
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Guardamos el rol anterior del usuario antes de actualizarlo
        const previousRole = user.role;

        // Actualizamos el rol del usuario con el nuevo valor
        user.role = role;
        await user.save(); // Guardamos los cambios en la base de datos

        // Si el nuevo rol es "escultor" y el rol anterior no lo era, creamos un nuevo escultor
        if (role === "escultor" && previousRole !== "escultor") {
            const existingSculptor = await Escultor.findOne({ where: { userId: id } });

            // Si el escultor no existe, lo creamos
            if (!existingSculptor) {
                await Escultor.create({
                    userId: id,  // Asociamos al usuario con el escultor
                    username: user.username,  // Usamos el nombre de usuario
                    email: user.email,  // Usamos el email del usuario
                });
            }
        }
        // Si el rol anterior era "escultor" y el nuevo rol no lo es, desactivamos el escultor
        else if (role !== "escultor" && previousRole === "escultor") {
            await Escultor.update({ isActive: false }, { where: { userId: id } });
        }

        // Respondemos con un mensaje de éxito y los detalles del usuario actualizado
        res.status(200).json({ message: "Rol actualizado correctamente", user });
    } catch (error) {
        // Si ocurre un error, lo registramos y respondemos con un error 500
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = { updateUserRole };