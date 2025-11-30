/**
 * Class: Hero
 * Description: Hero section component for the home page. Displays a background video, logo, title, and a scroll indicator.
 * Responsibilities:
 *   - Render the hero section with video background.
 *   - Display the main title and description.
 *   - Provide a visual cue for scrolling.
 * Collaborators:
 *   - Framer Motion: Used for animations (text gradient, bounce).
 */
import { motion } from 'framer-motion';
import React from "react";
import logo2 from "../../assets/images/b24-slide-principal-nuevo-logo-gobierno.png";
const jumpAnimation = {
    0: { transform: 'translateY(0)' },
    25: { transform: 'translateY(-30px)' },
    50: { transform: 'translateY(0)' },
    75: { transform: 'translateY(30px)' },
    100: { transform: 'translateY(0)' }
};

const Hero: React.FC = () => {

    return (
        <section className="relative w-full h-screen">
            {/* Background Video */}
            <div className="absolute inset-0 overflow-hidden">
                <video
                    src="https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/B24-web-slide-institucional-nuevo-c.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'right center' }}
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-15"></div>

            {/* Content */}
            <div className="absolute flex flex-col items-center justify-center w-full h-full text-center sm:space-y-10">
                {/* Logo */}
                <div className="relative sm:m-1 sm:-mt-4 md:m-20 md:-mt-3 lg:m-20 lg:-mt-3">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-200 via-indigo-100 to-purple-100"></div>
                    <img src={logo2} alt="Gobierno Logo" className="relative" />
                </div>

                {/* Title */}
                <div className="relative m-4 md:m-28">
                    <h1 className="text-balance text-5xl md:text-6xl lg:text-8xl  font-semibold tracking-tight animate-text-gradient animate-fadeInUp delay-1000">
                        Bienal del Chaco 2024 <br /> del 12 al 21 de Julio
                    </h1>
                </div>

                {/* Description */}
                <p className="text-pretty text-2xl md:text-3xl lg:5xl bg-gradient-to-r from-gray-300 via-yellow-300 to-gray-800 bg-clip-text text-transparent tracking-wider sm:bg-gradient-to-r sm:from-gray-800 sm:via-blue-400 sm:to-gray-300">
    Donde el arte y la cultura convergen para crear algo único.
</p>

                {/* Scroll message */}
                <motion.div
                    className="flex flex-col items-center justify-center animate-bounce"
                    animate={jumpAnimation}
                    transition={{ duration: 2, repeat: Infinity, ease: 'ease-in-out' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="80" height="80">
                        <line x1="100" y1="120" x2="85" y2="135" stroke="black" strokeWidth="2" />
                        <line x1="100" y1="120" x2="115" y2="135" stroke="black" strokeWidth="2" />
                    </svg>

                    <p className="text-xl bg-gradient-to-r from-gray-800 via-blue-400 to-red-700 bg-clip-text text-transparent tracking-wider font-semibold">
                        Desplázame
                    </p>

                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
