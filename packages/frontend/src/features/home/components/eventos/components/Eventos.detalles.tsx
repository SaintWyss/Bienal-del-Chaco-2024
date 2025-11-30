import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventoById } from '../../../../../services/EventService.ts';
import EsculturasMovileEventos from "./EsculturasMovileEventos.tsx";
import SculptureListeventos from "./EsculturasEventos.tsx";


interface Evento {
    id: string;
    nombre: string;
    descripcion: string;
    tematica: string;
    fechaInc: string;
    fechaFin: string;
    imagen: string;
}

const EventosDetalles: React.FC = () => {
    const { id = '' } = useParams<{ id: string }>();
    const [evento, setEvento] = useState<Evento | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const data = await getEventoById(id);
                if (data && data.evento) {
                    setEvento(data.evento);
                } else {
                    setError('Evento no encontrado');
                }
            } catch (e) {
                setError('No se pudo obtener el evento. Intenta nuevamente.');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchEvento();
    }, [id]);

    if (loading) {
        return <p className="text-center text-gray-500">Cargando detalles del evento...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!evento) {
        return <p className="text-center text-gray-500">Evento no encontrado</p>;
    }

    return (
        // Contenedor principal
        <div className="relative w-full h-full overflow-hidden bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
            {/* Contenido */}
            <div className="relative w-full h-full overflow-hidden p-14">

                {/* Detalles del evento */}
                <div
                    className="max-w-6xl mx-auto place-items-center bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out text-white ">
                    {/* Imagen del evento */}
                    <div className="relative">
                        <img
                            src={evento.imagen}
                            alt={`Imagen del evento ${evento.nombre}`}
                            className="w-full h-96 object-cover"
                        />
                        <div
                            className="absolute inset-0 bg-black bg-opacity-50 flex text-center items-center text-4xl font-bold text-white">
                            {evento.nombre}
                        </div>
                    </div>

                    {/* Información */}
                    <div className="p-10 flex flex-col place-items-center">
                        <h1 className="text-5xl font-extrabold text-white drop-shadow-md text-center">
                            {evento.nombre}
                        </h1>
                        <p className="text-lg mt-6 text-gray-200 leading-relaxed text-center">
                            {evento.descripcion}
                        </p>
                        <div className="mt-8 space-y-4 text-lg">
                            <p className="flex items-center">
                                <span className="font-semibold">🎨 Temática:</span>{' '}
                                <span className="ml-2">{evento.tematica}</span>
                            </p>
                            <p className="flex items-center">
                                <span className="font-semibold">📅 Fecha de inicio:</span>{' '}
                                <span className="ml-2">
                                    {new Date(evento.fechaInc).toLocaleDateString('es-ES')}
                                </span>
                            </p>
                            <p className="flex items-center">
                                <span className="font-semibold">🏁 Fecha de finalización:</span>{' '}
                                <span className="ml-2">
                                    {new Date(evento.fechaFin).toLocaleDateString('es-ES')}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Lista de esculturas relacionadas */}
                <div className="relative w-full h-full overflow-hidden p-0 rounded-xl place-items-center block md:hidden p-4">
                    {/* Mostrar EsculturasMovileEventos solo en pantallas pequeñas */}
                    <EsculturasMovileEventos eventoId={evento.id} />
                </div>
                <div className="relative w-full h-full overflow-hidden p-0 rounded-xl place-items-center hidden md:block p-4">
                    {/* Mostrar EsculturasMovileEventos solo en pantallas grndes */}
                    <SculptureListeventos eventoId={evento.id}/>
                </div>



            </div>
        </div>
    );
};

export default EventosDetalles;
