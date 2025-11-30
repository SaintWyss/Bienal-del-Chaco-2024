import React from "react";

interface EventCardHomeProps {
    nombre: string;
    descripcion: string;
    imagen: string;
    fechaInc: string;
    fechaFin: string;
    tematica: string;
    id: string;
}

const EventoCardHome: React.FC<EventCardHomeProps> = ({
                                                          nombre,
                                                          descripcion,
                                                          imagen,
                                                          fechaInc,
                                                          fechaFin,
                                                          tematica,
                                                          id,
                                                      }) => {
    return (
        <div className="w-full min-h-[300px] sm:min-h-[350px] h-auto flex flex-col items-center justify-center">
            <div
                className="relative w-full h-full max-w-full sm:max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 group"
                style={{
                    backgroundImage: `url(${imagen})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col justify-between h-full p-3 sm:p-4 md:p-6 lg:p-10 text-white text-center">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide mb-4 sm:mb-6">
                        {nombre}
                    </h3>

                    <p className="text-sm sm:text-lg md:text-xl font-semibold text-orange-400 mb-4 sm:mb-6">
                        {tematica}
                    </p>

                    <p className="mt-2 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                        {descripcion}
                    </p>

                    <p className="mt-2 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                        Desde {new Date(fechaInc).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })} hasta {new Date(fechaFin).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </p>

                    <a
                        href={`/events/${id}`}
                        className="mt-4 sm:mt-6 inline-block py-3 sm:py-4 px-8 sm:px-12 bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 text-white text-base sm:text-xl font-medium rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                    >
                        Ver Detalles
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EventoCardHome;
