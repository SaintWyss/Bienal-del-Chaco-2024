import React, { useState, useEffect } from "react";
import { getEsculturasByEvent, getEsculturas } from "../../../../../services/SculptureService.ts";
import EsculturaCardHome from "../ui/escultura.card.home.tsx";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Autoplay, Navigation, Pagination} from "swiper/modules";


interface SculptureListHomeProps {
    eventoId?: number; // Evento opcional.
}

const SculptureListHomeMobile: React.FC<SculptureListHomeProps> = ({ eventoId }) => {
    const [esculturas, setEsculturas] = useState<any[]>([]);

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
            <div className="absolute inset-0 bg-black flex flex-col items-center opacity-40"></div>
            <div className="relative z-10 flex flex-col items-center pt-10 px-4 w-full h-full overflow-hidden">
                <div className="flex items-center space-x-4 mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white text-center drop-shadow-lg">
                        Esculturas Destacadas
                    </h2>
                </div>

                {/* Swiper: Carrusel */}
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={150}
                    slidesPerView={1}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    loop
                    autoHeight={true}  // Ensure this property is enabled
                    className="relative w-full flex flex-col items-center flex-grow rounded-3xl overflow-hidden"
                >
                    {esculturas.map((escultura, index) => (
                        <SwiperSlide key={index}>
                            <EsculturaCardHome {...escultura} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div
                    className="relative bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-full flex justify-center">
                    <Link
                        to="/Esculturas"
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
                        Ver Esculturas
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SculptureListHomeMobile;
