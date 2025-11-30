import React, { useState } from 'react';
import { createEvento } from '../../../../../services/EventService.ts';

const EventCreate = () => {
    const [nombre, setTitle] = useState('');
    const [tematica, setTheme] = useState('');
    const [descripcion, setDescription] = useState('');
    const [imagen, setImage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newEvent = {
            nombre,
            tematica: tematica || null,
            descripcion: descripcion || null,
            imagen: imagen || null,
        };

        try {
            console.log('Enviando datos:', newEvent);

            // Llamada al servicio para crear el evento
            const response = await createEvento(newEvent);
            console.log('Respuesta del servidor:', response);

            // Validar la respuesta del servidor
            if (response && response.message === 'Evento creado exitosamente') {
                alert('Evento creado con éxito');
                // Limpiar los campos después de crear el evento
                setTitle('');
                setTheme('');
                setDescription('');
                setImage('');
                setError(''); // Limpiar errores anteriores
            } else {
                setError(response?.message || 'No se pudo crear el evento. Inténtalo de nuevo.');
            }
        } catch (error: any) {
            console.error('Error al crear evento:', error);

            // Manejo de errores detallado
            if (error.response) {
                console.error('Respuesta del servidor:', error.response);
                setError(`Error: ${error.response.status} - ${error.response.data.message}`);
            } else if (error.request) {
                console.error('Error en la solicitud:', error.request);
                setError('Hubo un error con la solicitud al servidor.');
            } else {
                console.error('Error desconocido:', error.message);
                setError('Hubo un error desconocido al procesar el formulario.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <input
                type="text"
                placeholder="Título"
                value={nombre}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="off"
                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <input
                type="text"
                placeholder="Temática"
                value={tematica}
                onChange={(e) => setTheme(e.target.value)}
                autoComplete="off"
                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Imagen"
                value={imagen}
                onChange={(e) => setImage(e.target.value)}
                autoComplete="off"
                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Crear Evento
            </button>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
    );
};

export default EventCreate;
