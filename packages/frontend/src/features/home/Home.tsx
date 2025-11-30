import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import Hero from "./components/Hero/Hero.tsx";
import EventosHome from "./components/eventos/pages/eventos.home.tsx";
import Maps from "./components/Maps/pages/Maps.tsx";
import { Pagination } from "swiper/modules";
import Navigation from "../../layout/Navbar/Navigation.tsx";
import { INavbarLink } from "../../layout/Navbar/components/interfaces/INavigationLink.ts";
import Ranking from "./components/ranking/Ranking.tsx";
import EsculturasIndex from "./components/esculturas/pages/Esculturas.index.tsx";
import EscultoresIndex from "./components/escultores/pages/escultores.index.tsx";

// Definimos los enlaces de la barra de navegación
const navbarLinks: INavbarLink[] = [
    { id: "hero", label: "Inicio", index: 0 },
    { id: "eventos", label: "Eventos", index: 1 },
    { id: "esculturas", label: "Esculturas", index: 2 },
    { id: "escultores", label: "Escultores", index: 3 },
    { id: "ranking", label: "Ranking", index: 4 },
    { id: "maps", label: "Maps", index: 5 },
];

const Home: React.FC = () => {
    const swiperRef = useRef<any>(null);
    const [swiperHeight, setSwiperHeight] = useState<number>(window.innerHeight); // Guardamos la altura dinámica

    // Función que maneja el clic en un enlace de navegación
    const handleNavigationClick = (index: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index); // Desplaza al slide correspondiente
        }
    };

    // Ajustamos la altura del swiper cuando cambia el tamaño de la ventana
    useEffect(() => {
        const updateHeight = () => {
            setSwiperHeight(window.innerHeight); // Actualizamos la altura
        };

        window.addEventListener("resize", updateHeight); // Escuchamos cambios en el tamaño de la ventana
        return () => window.removeEventListener("resize", updateHeight); // Limpiamos el listener
    }, []);

    return (
        <div className="w-full h-full overflow-hidden">
            {/* Barra de navegación con enlaces */}
            <Navigation links={navbarLinks} onLinkClick={(index) => handleNavigationClick(index)} />

            {/* Contenedor principal para Swiper */}
            <Swiper
                direction="vertical" // Definimos la dirección vertical para el swiper
                slidesPerView={1} // Solo se muestra un slide a la vez
                spaceBetween={0} // Sin espacio entre los slides
                pagination={{ clickable: true }} // Habilitamos la paginación
                modules={[Pagination]} // Usamos el módulo de paginación
                className="w-full"
                onSwiper={(swiper) => (swiperRef.current = swiper)} // Guardamos la referencia del swiper
                style={{ height: swiperHeight }} // Aplicamos la altura dinámica calculada
                breakpoints={{
                    // En dispositivos más pequeños (hasta 768px de ancho)
                    768: {
                        direction: "vertical", // Mantenemos el swiper vertical
                        slidesPerView: 1, // Solo un slide visible
                        spaceBetween: 0, // Sin espacio entre los slides
                    },
                    // En pantallas grandes (más de 768px)
                    1024: {
                        direction: "vertical", // Mantenemos el swiper vertical
                        slidesPerView: 1, // Un slide visible
                        spaceBetween: 0, // Sin espacio entre los slides
                    },
                }}
            >
                {/* Hero Slide */}
                <SwiperSlide className="w-full h-full bg-gradient-to-b from-blue-500 to-blue-700 flex items-center justify-center">
                    <Hero />
                </SwiperSlide>

                {/* Event List Slide */}
                <SwiperSlide className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center">
                    <EventosHome />
                </SwiperSlide>

                {/* Sculpture List Slide */}
                <SwiperSlide className="w-full h-full bg-gradient-to-b from-blue-300 to-blue-500 flex items-center justify-center">
                    <EsculturasIndex/>
                </SwiperSlide>

                {/* Sculptor List Slide */}
                <SwiperSlide className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center">
                    <EscultoresIndex />
                </SwiperSlide>

                {/* Ranking Slide */}
                <SwiperSlide className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center">
                    <Ranking />
                </SwiperSlide>

                {/* Maps Slide */}
                <SwiperSlide className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center">
                    <Maps />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Home;
