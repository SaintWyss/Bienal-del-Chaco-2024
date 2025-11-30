/**
 * Class: Home
 * Description: Main landing page component that uses a vertical Swiper to navigate between different sections (Hero, Events, Sculptures, etc.).
 * Responsibilities:
 *   - Render the main navigation and content slides.
 *   - Manage the vertical swiper state and navigation.
 *   - Handle window resize events to adjust swiper height.
 * Collaborators:
 *   - Navigation: Renders the navbar.
 *   - Hero, EventosHome, EsculturasIndex, EscultoresIndex, Ranking, Maps: Child components for each section.
 *   - Swiper: Third-party library for slide functionality.
 */
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

// Define navigation links
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
    const [swiperHeight, setSwiperHeight] = useState<number>(window.innerHeight); // Store dynamic height

    // Handle click on navigation link
    const handleNavigationClick = (index: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index); // Scroll to corresponding slide
        }
    };

    // Adjust swiper height when window size changes
    useEffect(() => {
        const updateHeight = () => {
            setSwiperHeight(window.innerHeight); // Update height
        };

        window.addEventListener("resize", updateHeight); // Listen for window resize changes
        return () => window.removeEventListener("resize", updateHeight); // Clean up listener
    }, []);

    return (
        <div className="w-full h-full overflow-hidden">
            {/* Navigation bar with links */}
            <Navigation links={navbarLinks} onLinkClick={(index) => handleNavigationClick(index)} />

            {/* Main Swiper container */}
            <Swiper
                direction="vertical" // Define vertical direction for swiper
                slidesPerView={1} // Show only one slide at a time
                spaceBetween={0} // No space between slides
                pagination={{ clickable: true }} // Enable pagination
                modules={[Pagination]} // Use pagination module
                className="w-full"
                onSwiper={(swiper) => (swiperRef.current = swiper)} // Save swiper reference
                style={{ height: swiperHeight }} // Apply calculated dynamic height
                breakpoints={{
                    // On smaller devices (up to 768px width)
                    768: {
                        direction: "vertical", // Keep swiper vertical
                        slidesPerView: 1, // Only one slide visible
                        spaceBetween: 0, // No space between slides
                    },
                    // On large screens (over 768px)
                    1024: {
                        direction: "vertical", // Keep swiper vertical
                        slidesPerView: 1, // One slide visible
                        spaceBetween: 0, // No space between slides
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
