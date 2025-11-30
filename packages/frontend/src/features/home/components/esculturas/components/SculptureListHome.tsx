import React, { useState, useEffect, useRef } from "react";
import { getEsculturasByEvent, getEsculturas } from "../../../../../services/SculptureService.ts";
import EsculturaCardHome from "../ui/escultura.card.home.tsx";
import { Link } from "react-router-dom";

interface SculptureListHomeProps {
    eventoId?: number; // Evento opcional.
}

const SculptureListHome: React.FC<SculptureListHomeProps> = ({ eventoId }) => {
    const [esculturas, setEsculturas] = useState<any[]>([]);
    const containerRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const fetchEsculturas = async () => {
            try {
                const data = eventoId
                    ? await getEsculturasByEvent(eventoId)
                    : await getEsculturas();
                setEsculturas(data.esculturas);
            } catch (error) {
                console.error("Error al cargar esculturas:", error);
            }
        };

        fetchEsculturas();
    }, [eventoId]);

    return (
        <div
            className="relative w-full h-full bg-cover bg-center flex flex-col justify-center items-center"
            style={{
                backgroundImage: "url('https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/03/Fondo-bienal-colores.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 flex flex-col items-center pt-10 px-4 w-full h-full overflow-hidden">
                <div className="flex items-center space-x-4 mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white text-center drop-shadow-lg">
                        Esculturas Destacadas
                    </h2>
                </div>
                {/* Contenedor dinámico de esculturas */}
                <div className="space-y-10">
                    {Array.from({ length: Math.ceil(esculturas.length / 5) }, (_, rowIndex) => (
                        <div
                            key={rowIndex}
                            ref={(el) => (containerRefs.current[rowIndex] = el!)}
                            className={`flex overflow-x-hidden items-center ${
                                rowIndex % 2 === 0 ? "animate-scroll-left" : "animate-scroll-right"
                            }`}
                            style={{ padding: '0 20px' }}
                        >
                            {[...esculturas, ...esculturas].slice(0, esculturas.length * 2).map((escultura, index) => (
                                <EsculturaCardHome
                                    key={index}
                                    {...escultura}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="mt-10"> {/* Added margin-top to create space */}
                    <Link
                        to="/Esculturas"
                        className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110"
                    >
                        Ver todas las esculturas
                    </Link>
                </div>
            </div>

            {/* Animación de desplazamiento automático */}
            <style>{`
                .animate-scroll-left {
                    animation: scroll-left 30s linear infinite;
                }
                .animate-scroll-right {
                    animation: scroll-right 30s linear infinite;
                }
                @keyframes scroll-left {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                @keyframes scroll-right {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(50%);
                    }
                }
            `}</style>
        </div>
    );
};

export default SculptureListHome;