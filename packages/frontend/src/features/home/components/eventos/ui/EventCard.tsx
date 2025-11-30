import React, { useState } from 'react';

interface EventCardProps {
    nombre: string;
    descripcion: string;
    imagen: string;
    fecha: string;
    tematica: string;
    id: string;
}

const EventCard: React.FC<EventCardProps> = ({ nombre, descripcion, imagen, fecha, tematica, id }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const defaultImage =
        'https://via.placeholder.com/600x400?text=Evento+Sin+Imagen';

    const shortDescription = descripcion.length > 100 ? `${descripcion.slice(0, 100)}...` : descripcion;

    return (
        <div className="p-4 sm:p-6 lg:p-0">
            <div
                className="w-full max-w-sm md:max-w-md lg:max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Imagen */}
                <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
                    <img
                        src={imagen || defaultImage}
                        alt="Imagen del evento"
                        className="w-full h-full object-cover"
                    />
                    {/* Superposición de color */}
                    <div
                        className={`absolute inset-0 transition-all duration-500 ${
                            isHovered ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-20'
                        }`}
                    />
                </div>

                {/* Contenido */}
                <div className="flex flex-col justify-between w-full p-4 sm:p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
                    {/* Temática */}
                    <p className="text-xs sm:text-sm uppercase tracking-wide text-purple-700 font-semibold mb-1">
                        {tematica}
                    </p>

                    {/* Título */}
                    <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-800 leading-tight">
                        {nombre}
                    </h2>

                    {/* Descripción */}
                    <p className="text-gray-600 text-sm sm:text-base md:text-md mt-2 sm:mt-3">
                        {isExpanded ? descripcion : shortDescription}
                        {!isExpanded && descripcion.length > 100 && (
                            <button
                                onClick={() => setIsExpanded(true)}
                                className="ml-2 text-blue-500 font-semibold hover:underline"
                            >
                                Ver más
                            </button>
                        )}
                        {isExpanded && (
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="ml-2 text-blue-500 font-semibold hover:underline"
                            >
                                Ver menos
                            </button>
                        )}
                    </p>

                    {/* Fecha */}
                    <p className="text-xs sm:text-sm md:text-md font-medium text-gray-500 mt-4">
                        📅 {fecha}
                    </p>

                    {/* Botón Ver Más */}
                    <a
                        href={`/events/${id}`}
                        className="mt-4 py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg text-sm md:text-base shadow-md hover:from-purple-500 hover:to-indigo-500 transition-transform duration-300"
                    >
                        Ver detalles
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
