import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { fetchEscultoresConNombre } from "../../../../../services/escultorService.ts";
import SculptorCardHomeMobile from "../ui/SculptorCardHomeMobile.tsx";
import { Link } from "react-router-dom";

const SculptorListMobile: React.FC = () => {
    const [escultores, setEscultores] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEscultores = async () => {
            try {
                const data = await fetchEscultoresConNombre();
                setEscultores(data);
            } catch (error) {
                console.error("Error al obtener los escultores:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEscultores();
    }, []);

    return (
        <div
            className="relative w-full h-full bg-cover bg-center flex flex-col justify-center items-center overflow-hidden"
            style={{
                backgroundImage:
                    "url('https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/03/Fondo-escultores-invitados.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <div className="relative z-10 flex flex-col items-center pt-24 px-4 w-full">
                <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12 drop-shadow-lg">
                    Escultores Destacados
                </h2>

                {loading ? (
                    <p className="text-white text-lg">Cargando escultores...</p>
                ) : escultores.length > 0 ? (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{ clickable: true }}
                        className="w-full max-w-7xl mb-14"
                    >
                        {escultores.slice(0, 12).map((escultor, id) => (
                            <SwiperSlide key={id}>
                                <SculptorCardHomeMobile
                                    nombre={escultor["usuario.nombre"]}
                                    biografia={escultor.biografia}
                                    puntuacionTotal={escultor.puntuacionTotal}
                                    imagen={escultor.imagen || 'https://via.placeholder.com/300'}
                                    instagram={escultor.instagram}
                                    facebook={escultor.facebook}
                                    youtube={escultor.youtube}
                                    linkedin={escultor.linkedin}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-white text-lg">No hay escultores disponibles.</p>
                )}
            </div>

            <div
                className="relative bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-full flex justify-center">
                <Link
                    to="/Escultores"
                    className="flex items-center justify-center aspect-[6/1] cursor-pointer rounded-md border-2 border-gray-800 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-4 text-md font-bold shadow-2xl transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-gradient-to-br hover:from-yellow-500 hover:to-red-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-white mr-4"
                    >
                        <path
                            d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"
                        />
                    </svg>
                    Ver escultores
                </Link>
            </div>
        </div>
    );
};

export default SculptorListMobile;