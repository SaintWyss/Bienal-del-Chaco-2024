/**
 * Class: Maps
 * Description: Component that displays the location of the event on Google Maps and a footer.
 * Responsibilities:
 *   - Render the Google Maps iframe.
 *   - Display the footer with social media links and copyright info.
 * Collaborators:
 *   - None (Uses static assets and external links).
 */
import React from 'react';
import logo from "../../../assets/images/B22-Slide-web-footer-v4.fw_.png";

const Maps: React.FC = () => {
    return (
        <section className="relative bg-gray-100 lg:h-screen w-screen">
            {/* Google Maps iframe */}
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14164.10854776721!2d-58.98136!3d-27.437265!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x891619c21777887b!2sPredio+de+las+Bienales!5e0!3m2!1ses!2sar!4v1543334233591"
                className="w-full h-[calc(100vh-70px)] sm:h-[calc(70vh-80px)]"
                loading="lazy"
                title="Ubicación Predio de las Bienales"
            ></iframe>

            {/* Footer */}
            <footer
                className="absolute bottom-0 left-0 w-full bg-cover bg-center text-white"
                style={{
                    backgroundImage: `url('https://plus.unsplash.com/premium_photo-1719864933065-6639a2d32e56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                }}
            >
                <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-8 sm:py-12 md:px-12">
                    {/* Social Media */}
                    <div className="flex gap-6 mt-4 sm:mt-0">
                        <a
                            href="https://twitter.com/bienaldelchaco"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl hover:text-gray-300 transition-colors"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            href="https://www.youtube.com/BienaldelChaco"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl hover:text-gray-300 transition-colors"
                        >
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a
                            href="https://www.facebook.com/bienaldelchaco"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl hover:text-gray-300 transition-colors"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                            href="https://www.instagram.com/bienaldelchaco/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl hover:text-gray-300 transition-colors"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>

                    {/* Logo */}
                    <div className="flex justify-center items-center mt-6 sm:mt-0">
                        <img
                            src={logo}
                            alt="Logo Bienal"
                            className="h-16 sm:h-24 object-contain"
                        />
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center py-4 bg-black bg-opacity-50">
                    <p className="text-sm opacity-80">
                        Copyright © {new Date().getFullYear()} - Todos los derechos reservados por Bienal Internacional
                        de Escultura del Chaco.
                    </p>
                </div>
            </footer>
        </section>
    );
};

export default Maps;
