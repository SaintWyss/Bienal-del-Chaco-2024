/**
 * Class: SculptorList
 * Description: Component that displays a list of sculptors in a card carousel format.
 * Responsibilities:
 *   - Fetch the list of sculptors.
 *   - Display sculptor details (image, biography, score, social media).
 *   - Handle loading and error states.
 * Collaborators:
 *   - escultorService: Fetches the list of sculptors.
 *   - Swiper: Third-party library for the carousel.
 */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { fetchEscultores } from "../../../../../services/escultorService.ts";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";

interface Escultor {
    userId: number;
    biografia: string | null;
    imagen: string;
    puntuacionTotal: number;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
}

const SculptorList: React.FC = () => {
    const [escultores, setEscultores] = useState<Escultor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEscultores();
                setEscultores(Array.isArray(data) ? data : []);
            } catch (err) {
                setError("Error al cargar la lista de escultores");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="text-center text-lg text-gray-600">Cargando escultores...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="absolute inset-0 overflow-hidden w-full max-w-7xl mx-auto p-8 bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-300 rounded-lg shadow-xl">
            <h3 className="text-3xl font-bold text-center mb-8 text-white">Escultores Destacados</h3>

            {/* Swiper */}
            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="rounded-lg shadow-xl"
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {escultores.length > 0 ? (
                    escultores.map((escultor) => (
                        <SwiperSlide key={escultor.userId}>
                            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
                                {/* Image Container */}
                                <div className="relative w-full h-64 md:h-72">
                                    <img
                                        src={escultor.imagen || "/default-image.jpg"}
                                        alt={escultor.biografia || "Escultor"}
                                        className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        {escultor.biografia || "Biografía no disponible"}
                                    </h4>
                                    <p className="text-gray-600 text-sm mt-2">Puntuación: {escultor.puntuacionTotal}</p>
                                    <div className="mt-3 flex justify-start gap-4">
                                        {escultor.instagram && (
                                            <a
                                                href={escultor.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                <FaInstagram size={20} />
                                            </a>
                                        )}
                                        {escultor.facebook && (
                                            <a
                                                href={escultor.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                <FaFacebook size={20} />
                                            </a>
                                        )}
                                        {escultor.youtube && (
                                            <a
                                                href={escultor.youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                <FaYoutube size={20} />
                                            </a>
                                        )}
                                        {escultor.linkedin && (
                                            <a
                                                href={escultor.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                <FaLinkedin size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No hay escultores disponibles</p>
                )}
            </Swiper>
        </div>
    );
};

export default SculptorList;
