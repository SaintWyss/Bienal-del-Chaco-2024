import React, { useState } from 'react';

interface SculptorCardHomeProps {
    nombre: string;
    biografia?: string;
    puntuacionTotal: number;
    imagen: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
}

const SculptorCardHome: React.FC<SculptorCardHomeProps> = ({
    nombre,
    biografia = '',
    puntuacionTotal,
    imagen,
    instagram,
    facebook,
    youtube,
    linkedin,
}) => {
    const [showFullBio, setShowFullBio] = useState(false);

    return (
        <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-xl w-full max-w-xs mx-auto hover:shadow-xl transition-shadow duration-300">
            {/* Imagen del escultor */}
            <div className="w-full h-48 rounded-t-xl overflow-hidden border-b-2 border-gray-300">
                <img
                    src={imagen}
                    alt={`Imagen de ${nombre}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            {/* Información del escultor */}
            <div className="flex flex-col items-center mt-4">
                <h2 className="text-xl font-semibold text-gray-800">{nombre}</h2>
                <p className="text-sm text-gray-600 text-center">
                    {showFullBio ? biografia : `${biografia?.substring(0, 60)}...`}
                    {biografia && biografia.length > 60 && (
                        <button
                            onClick={() => setShowFullBio(!showFullBio)}
                            className="ml-1 text-blue-500 hover:underline"
                        >
                            {showFullBio ? 'Ver menos' : 'Ver más'}
                        </button>
                    )}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    <span className="font-medium">Puntuación:</span> {puntuacionTotal}
                </p>
                {/* Redes sociales */}
                <div className="flex mt-3 space-x-2">
                    {instagram && (
                        <a
                            href={instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 hover:text-pink-600"
                        >
                            <i className="fab fa-instagram text-xl"></i>
                        </a>
                    )}
                    {facebook && (
                        <a
                            href={facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600"
                        >
                            <i className="fab fa-facebook text-xl"></i>
                        </a>
                    )}
                    {youtube && (
                        <a
                            href={youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:text-red-600"
                        >
                            <i className="fab fa-youtube text-xl"></i>
                        </a>
                    )}
                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-800"
                        >
                            <i className="fab fa-linkedin text-xl"></i>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SculptorCardHome;