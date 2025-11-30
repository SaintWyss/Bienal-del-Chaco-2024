import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import EventCardAdmin from './ui/EventCardAdmin.tsx';
import { getEventos, updateEvento } from '../../../../../services/EventService.ts';
import { EffectCoverflow } from 'swiper/modules';

const EventEditAdmin: React.FC = () => {
    const [eventos, setEventos] = useState<any[]>([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await getEventos(); // Llama al servicio para obtener los eventos
                setEventos(data);
            } catch (error) {
                console.error('Error al cargar los eventos:', error);
            }
        };

        fetchEventos();
    }, []);

    const handleSaveEvent = async (updatedEvent: any) => {
        try {
            await updateEvento(updatedEvent.id, updatedEvent); // Actualiza el evento en el servidor
            setEventos((prevEvents) =>
                prevEvents.map((evento) =>
                    evento.id === updatedEvent.id ? updatedEvent : evento
                )
            ); // Actualiza el evento en el estado
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
        }
    };

    return (
        <div className="max-w-max p-3 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-lg shadow-xl overflow-hidden ">
            <div className="text-center mb-6">
                <h1 className="text-xl font-extrabold text-gray-800 mb-10">Lista de Eventos</h1>
            </div>

            {eventos.length > 0 ? (
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    modules={[EffectCoverflow]}
                    className="w-full scale-[0.60] -top-32"
                >
                    {eventos.map((evento: any) => (
                        <SwiperSlide
                            key={evento.id}
                            className="bg-white shadow-lg rounded-lg w-[340px] h-[500px] flex flex-col items-center overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                className="w-full h-48 object-cover rounded-t-lg"
                                src={evento.imagen}
                                alt={evento.nombre}
                            />
                            <div className="flex-1 p-4 flex flex-col space-y-2 overflow-y-auto max-h-max">
                                <h2 className="text-lg font-bold text-gray-800">{evento.nombre}</h2>
                                <p className="text-sm text-gray-600">{evento.descripcion}</p>
                                <div className="mt-auto">
                                    <EventCardAdmin
                                        id={evento.id}
                                        nombre={evento.nombre}
                                        tematica={evento.tematica}
                                        descripcion={evento.descripcion}
                                        imagen={evento.imagen}
                                        fechaInc={evento.fechaInc}
                                        fechaFin={evento.fechaFin}
                                        onSave={handleSaveEvent}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-gray-500 text-center">No hay eventos disponibles</p>
            )}
        </div>
    );
};

export default EventEditAdmin;
