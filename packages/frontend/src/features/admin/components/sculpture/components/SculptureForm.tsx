import React, { useState, useEffect } from 'react';
import { createEscultura } from '../../../../../services/SculptureService'; // Importar función para crear escultura
import { getEventos } from '../../../../../services/EventService'; // Importar función para obtener eventos
import {fetchEscultoresConNombre} from '../../../../../services/escultorService'; // Importar función para obtener escultores

// Definición de tipos para los eventos y escultores
interface Evento {
    id: string;
    nombre: string;
}

interface Escultor {
    userId: string;
    'usuario.nombre': string; // Mantener el nombre del usuario para mostrar en el select
}

// Componente de formulario para crear escultura
const SculptureForm: React.FC = () => {
    // Estado para manejar los datos del formulario
    const [nombre, setNombre] = useState<string>(''); // Estado para el nombre de la escultura
    const [eventoID, setEventoID] = useState<string>(''); // Estado para el ID del evento
    const [escultoresID, setEscultoresID] = useState<string>(''); // Estado para el ID del escultor (renombrado a escultoresID)
    const [eventos, setEventos] = useState<Evento[]>([]); // Estado para almacenar la lista de eventos
    const [escultores, setEscultores] = useState<Escultor[]>([]); // Estado para almacenar la lista de escultores
    const [error, setError] = useState<string>(''); // Estado para manejar los mensajes de error

    // useEffect para obtener los datos cuando se monta el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventosData = await getEventos(); // Obtener la lista de eventos
                const escultoresData = await fetchEscultoresConNombre(); // Obtener la lista de escultores

                console.log('Eventos:', eventosData); // Verificar que los eventos se obtienen correctamente
                console.log('Escultores:', escultoresData); // Verificar que los escultores se obtienen correctamente

                setEventos(eventosData); // Actualizar el estado con los eventos obtenidos
                setEscultores(escultoresData); // Actualizar el estado con los escultores obtenidos
            } catch (error) {
                console.error('Error al cargar datos:', error); // Log del error si ocurre
                setError('No se pudieron cargar los datos. Intenta nuevamente.'); // Mensaje de error en caso de fallo
            }
        };

        fetchData(); // Ejecutar la función para obtener los datos
    }, []); // Dependencia vacía, solo se ejecuta al montar el componente

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nombre || !eventoID || !escultoresID ) {
            setError('Por favor, completa todos los campos obligatorios.');
            return;
        }

        const nuevaEscultura = {
            nombre,
            eventoId: eventoID,
            escultorId: escultoresID,
        };

        console.log('Datos enviados:', nuevaEscultura);

        try {
            await createEscultura(nuevaEscultura);
            setNombre('');
            setEventoID('');
            setEscultoresID('');
            alert('Escultura creada con éxito');
        } catch (error) {
            console.error('Error al crear escultura:', error);
            setError('No se pudo crear la escultura. Inténtalo de nuevo.');
        }
    };

    // Render del componente
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto"> {/* Formulario */}
            <div>
                <label className="block text-sm font-medium">Nombre</label> {/* Etiqueta para el campo de nombre */}
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)} // Actualizar el estado con el nombre ingresado
                    required // Campo obligatorio
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" // Estilo del campo
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Evento</label> {/* Etiqueta para el campo de evento */}
                <select
                    value={eventoID}
                    onChange={(e) => setEventoID(e.target.value)} // Actualizar el ID del evento seleccionado
                    required // Campo obligatorio
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" // Estilo del campo
                >
                    {eventos.map((evento) => ( // Mapear la lista de eventos
                        <option key={evento.id} value={evento.id}> {/* Crear una opción por cada evento */}
                            {evento.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium">Escultor</label>
                <select
                    value={escultoresID}  // Ensure this stores the ID of the selected escultor
                    onChange={(e) => setEscultoresID(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                    {escultores.map((escultor) => (
                        <option key={escultor.userId} value={escultor.userId}>  {/* Use the userId as the value */}
                            {escultor['usuario.nombre']} {/* Display the name of the escultor */}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Mostrar el error si existe */}

            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
            >
                Crear Escultura
            </button>
        </form>
    );
};

export default SculptureForm;