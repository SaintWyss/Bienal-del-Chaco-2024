import React, { useState, useEffect } from 'react';
import { getEsculturas, getEsculturasByEvent } from '../../../../../services/SculptureService.ts';
import SculptureCard from '../ui/SculptureCard.tsx';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Autoplay, Navigation, Pagination} from "swiper/modules";

interface SculptureListProps {
    eventoId?: any;
}

const SculptureListMobile: React.FC<SculptureListProps> = ({ eventoId }) => {
    const [esculturas, setEsculturas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEsculturas = async () => {
            try {
                setLoading(true);
                const data = eventoId ? await getEsculturasByEvent(eventoId) : await getEsculturas();
                setEsculturas(data.esculturas);
            } catch (error) {
                console.error('Error al obtener las esculturas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEsculturas();
    }, [eventoId]);

    const handleClick = (id: string) => {
        window.location.href = `/escultura/${id}`;
    };

    if (loading) {
        return <p className="text-center text-gray-500">Cargando esculturas...</p>;
    }

    return (
       <div className="bg-gradient-to-tr from-blue-600 via-indigo-500 to-violet-500 min-h-screen">
            <div className="relative w-full p-4">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={10} // Espaciado horizontal entre las tarjetas
                    slidesPerView={1} // Asegura que solo una escultura se muestre a la vez
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    autoHeight={true} // Ajusta la altura del swiper
                    className="relative w-full flex flex-col items-center flex-grow rounded-3xl overflow-hidden p-4"
                    direction="horizontal" // Asegura que el desplazamiento sea horizontal
                >
                    {esculturas && esculturas.length > 0 ? (
                        esculturas.map((escultura: any) => (
                            <SwiperSlide key={escultura.id} className="flex justify-center p-4">
                                <div
                                    className=" bg-white shadow-lg rounded-lg p-4 flex flex-col items-center bg-gradient-to-tr from-blue-100 via-indigo-500 to-purple-100 p-4"
                                    onClick={() => handleClick(escultura.id)}
                                >
                                    <SculptureCard
                                        nombre={escultura.nombre}
                                        descripcion={escultura.descripcion}
                                        fechaCreacion={escultura.fechaCreacion}
                                        escultor={escultura.escultor.usuario?.nombre}
                                        imagenFinal={escultura.imagenFinal}
                                    />
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No hay esculturas disponibles</p>
                    )}
                </Swiper>
            </div>
            <div className="relative p-3 left-1/2 transform -translate-x-1/2 z-20 w-full flex justify-center">
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

export default SculptureListMobile;