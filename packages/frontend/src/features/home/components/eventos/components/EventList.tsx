import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {Autoplay, FreeMode, Navigation, Thumbs} from 'swiper/modules';
import EventCard from '../ui/EventCard.tsx';
import { getEventos } from '../../../../../services/EventService.ts';
import {Link} from "react-router-dom";

const EventList: React.FC = () => {
    const [eventos, setEventos] = useState<any[]>([]);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await getEventos();
                setEventos(data);
            } catch (error) {
                console.error('Error al cargar los eventos:', error);
            }
        };

        fetchEventos();
    }, []);

    return (
        <div
            className="flex flex-col justify-center items-center min-h-screen overflow-hidden py-8 bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500">
            {eventos.length > 0 ? (
                <>
                    {/* Swiper principal */}
                    <Swiper
                        modules={[FreeMode, Thumbs]}
                        spaceBetween={10}
                        slidesPerView={1}

                        thumbs={{swiper: thumbsSwiper}}
                        className="relative w-full pt-2 flex-grow rounded-3xl overflow-hidden"
                    >
                        {eventos.map((evento) => (
                            <SwiperSlide key={evento.id} className="justify-center items-center">
                                <EventCard
                                    nombre={evento.nombre}
                                    descripcion={evento.descripcion}
                                    imagen={evento.imagen}
                                    fecha={evento.fecha}
                                    tematica={evento.tematica}
                                    id={evento.id}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Swiper de miniaturas */}
                    <Swiper
                        modules={[FreeMode, Navigation, Autoplay, Thumbs]}
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        autoplay={{
                            delay: 20000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}

                        className="flex justify-center w-full max-w-7xl py-8"
                    >
                        {eventos.map((evento) => (
                            <SwiperSlide key={evento.id}>
                                <img
                                    src={evento.imagen}
                                    alt={evento.nombre}
                                    className="flex justify-center w-full h-full object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            ) : (
                <p className="text-xl text-gray-500">No hay eventos disponibles</p>
            )}
            <div className="relative p-4 left-1/2 transform -translate-x-1/2 z-20 w-full flex justify-center">
                <Link
                    to="/"
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
                    Volver
                </Link>
            </div>
        </div>
    );
};

export default EventList;