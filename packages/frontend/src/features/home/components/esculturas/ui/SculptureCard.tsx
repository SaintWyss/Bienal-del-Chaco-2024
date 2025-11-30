import React, { useState } from 'react';

interface SculptureCardProps {
    nombre: string;
    descripcion?: string;
    fechaCreacion?: string;
    imagenFinal?: string;  // Usamos solo una imagen final
    escultor?: string; // Agregamos el nombre del escultor
}

const SculptureCard: React.FC<SculptureCardProps> = ({ nombre, descripcion, fechaCreacion, imagenFinal, escultor }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
        <div className="max-w-xs w-full bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            {/* Imagen Final */}
            {imagenFinal && (
                <div className="w-full h-64 overflow-hidden rounded-t-xl">
                    <img
                        src={imagenFinal}
                        alt={nombre}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                    />
                </div>
            )}

            {/* Contenido */}
            <div className="p-6 space-y-4 bg-gradient-to-tr from-blue-100 via-indigo-100 to-red-100">
                {/* Título */}
                <h2 className="text-xl font-semibold text-gray-800 truncate ">{nombre}</h2>

                {/* Información adicional */}
                <div className="text-sm text-gray-600 space-y-1">
                    {fechaCreacion && (
                        <p>
                            <span className="font-medium text-gray-800">Fecha de creación:</span> {new Date(fechaCreacion).toLocaleDateString()}
                        </p>
                    )}
                    {escultor && (
                        <p>
                            <span className="font-medium text-gray-800">Escultor:</span> {escultor}
                        </p>
                    )}
                </div>

                {/* Descripción */}
                {descripcion && (
                    <p className="text-gray-700 ">
                        {showFullDescription ? descripcion : `${descripcion.substring(0, 150)}...`}
                        {descripcion.length > 150 && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-1 underline"
                            >
                                {showFullDescription ? 'Ver menos' : 'Ver más'}
                            </button>
                        )}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SculptureCard;
