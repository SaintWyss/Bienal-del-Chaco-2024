const { Evento, Escultura } = require("../models");

// Crear un evento
const crearEvento = async (req, res) => {
    try {
        // Desestructurar los datos del cuerpo de la solicitud
        const { nombre, tematica, descripcion, fechaInc, fechaFin, imagen } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!nombre || !tematica) {
            return res.status(400).json({ message: 'Faltan campos requeridos: nombre, tematica' });
        }

        // Crear un nuevo evento con los datos proporcionados
        const evento = await Evento.create({
            nombre,
            tematica,
            descripcion: descripcion || null,  // Si no se proporciona, se asigna null
            fechaInc: fechaInc || null,        // Si no se proporciona, se asigna null
            fechaFin: fechaFin || null,        // Si no se proporciona, se asigna null
            imagen: imagen || null,            // Si no se proporciona, se asigna null
        });

        // Enviar respuesta exitosa con el evento creado
        res.status(201).json({ message: "Evento creado exitosamente", evento });
    } catch (error) {
        // Capturar cualquier error y devolver una respuesta con el mensaje adecuado
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

// Obtener todos los eventos
const obtenerEventos = async (req, res) => {
    try {
        // Obtener todos los eventos, incluyendo las esculturas asociadas
        const eventos = await Evento.findAll({
            include: [
                {
                    model: Escultura,
                    as: "esculturas",  // Nombre del alias de la relación
                    attributes: ["id", "nombre"],  // Incluir solo el ID y nombre de las esculturas
                },
            ],
        });

        // Enviar los eventos obtenidos en la respuesta
        res.status(200).json({ eventos });
    } catch (error) {
        // Capturar cualquier error y devolver una respuesta con el mensaje adecuado
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener un evento por ID
const obtenerEventoPorId = async (req, res) => {
    try {
        const { id } = req.params;  // Obtener el ID del evento desde los parámetros de la URL

        // Buscar el evento por ID, incluyendo las esculturas asociadas
        const evento = await Evento.findByPk(id, {
            include: [
                {
                    model: Escultura,
                    as: "esculturas",  // Nombre del alias de la relación
                    attributes: ["id", "nombre", "descripcion"],  // Incluir más detalles de las esculturas
                },
            ],
        });

        // Verificar si el evento fue encontrado
        if (!evento) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        // Enviar el evento encontrado en la respuesta
        res.status(200).json({ evento });
    } catch (error) {
        // Capturar cualquier error y devolver una respuesta con el mensaje adecuado
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar un evento
const actualizarEvento = async (req, res) => {
    try {
        const { id } = req.params;  // Obtener el ID del evento desde los parámetros de la URL
        const { nombre, tematica, descripcion, fechaInc, fechaFin, imagen } = req.body;  // Obtener los datos del cuerpo de la solicitud

        // Buscar el evento por ID
        const evento = await Evento.findByPk(id);

        // Verificar si el evento existe
        if (!evento) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        // Actualizar el evento con los nuevos datos proporcionados
        await evento.update({
            nombre,
            tematica,
            descripcion,
            fechaInc, // Actualizar la fecha de inicio
            fechaFin, // Actualizar la fecha de fin
            imagen,
        });

        // Enviar respuesta exitosa con el evento actualizado
        res.status(200).json({ message: "Evento actualizado exitosamente", evento });
    } catch (error) {
        // Capturar cualquier error y devolver una respuesta con el mensaje adecuado
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar un evento
const eliminarEvento = async (req, res) => {
    try {
        const { id } = req.params;  // Obtener el ID del evento desde los parámetros de la URL

        // Buscar el evento por ID
        const evento = await Evento.findByPk(id);

        // Verificar si el evento existe
        if (!evento) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        // Eliminar el evento
        await evento.destroy();

        // Enviar respuesta exitosa
        res.status(200).json({ message: "Evento eliminado exitosamente" });
    } catch (error) {
        // Capturar cualquier error y devolver una respuesta con el mensaje adecuado
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento,
};