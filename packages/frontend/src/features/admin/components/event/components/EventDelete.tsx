import React, { useEffect, useState } from 'react';
import { getEventos, deleteEvento } from '../../../../../services/EventService.ts';

const EventDelete: React.FC = () => {
    const [eventos, setEventos] = useState<any[]>([]);

    const fetchEventos = async () => {
        const data = await getEventos();
        setEventos(data);
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteEvento(id);
            alert('Evento eliminado con éxito');
            fetchEventos(); // Recargar la lista de eventos después de eliminar uno
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Eliminar Eventos</h2>
            {eventos.map((evento) => (
                <div key={evento.id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded">
                    <span>{evento.nombre}</span>
                    <button
                        onClick={() => handleDelete(evento.id)}
                        className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EventDelete;