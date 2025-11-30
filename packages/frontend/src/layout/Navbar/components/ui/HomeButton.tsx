import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/web-logo-130x50-3.png"; // Logo de la página

const HomeButton: React.FC = () => {
    const navigate = useNavigate(); // Hook para navegar entre rutas

    const handleClick = () => {
        navigate("/"); // Redirige al home
    };

    return (
        <button
            onClick={handleClick} // Acción de navegación al hacer click
            className="relative font-semibold text-white cursor-pointer border-none rounded-full w-40 h-16 z-10 overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 hover:from-orange-500 hover:to-pink-500 transition-all duration-300"
        >
            {/* Contenedor con imagen centrada y fondo desenfocado */}
            <span className="w-full h-full absolute inset-0 flex items-center justify-center text-lg z-10 backdrop-blur-md">
                <img src={logo} alt="Home" className="h-10 object-contain" />
            </span>

            {/* Blobs de fondo animados */}
            <span className="blob absolute top-0 left-0 w-24 h-16 rounded-full bg-orange-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
            <span className="blob absolute top-0 left-10 w-24 h-16 rounded-full bg-purple-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
            <span className="blob absolute top-[-1em] left-20 w-24 h-16 rounded-full bg-pink-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
            <span className="blob absolute top-8 left-24 w-24 h-16 rounded-full bg-blue-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
        </button>
    );
};

export default HomeButton;
