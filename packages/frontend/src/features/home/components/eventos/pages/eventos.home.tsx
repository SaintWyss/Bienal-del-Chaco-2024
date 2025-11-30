/**
 * Class: EventosHome
 * Description: Component that displays a carousel of events on the home page.
 * Responsibilities:
 *   - Fetch and display the list of events.
 *   - Manage the background image based on the current event slide.
 *   - Handle loading and error states.
 * Collaborators:
 *   - EventService: Fetches the list of events.
 *   - EventoCardHome: Displays individual event details in the carousel.
 *   - Swiper: Third-party library for the carousel.
 */
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { getEventos } from '../../../../../services/EventService.ts';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import EventoCardHome from "../ui/evento.card.home.tsx";
import { Link } from "react-router-dom";

const EventosHome: React.FC = () => {
    const [eventos, setEventos] = useState<any[]>([]);
    const [currentBg, setCurrentBg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await getEventos();
                setEventos(data || []);
                if (data?.length > 0) {
                    setCurrentBg(data[0].imagen);
                }
            } catch (error) {
                setError('Error al cargar los eventos');
            } finally {
                setLoading(false);
            }
        };
        fetchEventos();
    }, []);

    const handleSlideChange = (swiper: any) => {
        const currentIndex = swiper.realIndex;
        setCurrentBg(eventos[currentIndex]?.imagen || '');
    };

    return (
        // Main container
        // Background with image
        <div
            className="relative w-full h-full overflow-hidden"
            style={{
                backgroundImage: `url(${currentBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative w-full h-full flex flex-col justify-center">
                {loading ? (
                    <p className="text-center text-gray-300 text-2xl z-10 ">Cargando eventos...</p>
                ) : error ? (
                    <p className="text-center text-red-500 text-2xl z-10">{error}</p>
                ) : eventos.length > 0 ? (
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
                        onSlideChange={handleSlideChange}
                        className="relative w-full pt-36 flex-grow rounded-3xl overflow-hidden"
                    >
                        {eventos.map((evento) => (
                            <SwiperSlide key={evento.id}>
                                <EventoCardHome {...evento} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-center text-gray-300 text-2xl z-10">
                        No hay eventos disponibles
                    </p>
                )}

                <div
                    className="relative bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-full flex justify-center">
                    <Link
                        to="/Eventos"
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
                        Ver Eventos
                    </Link>
                </div>


            </div>
        </div>
    );
};

export default EventosHome;
