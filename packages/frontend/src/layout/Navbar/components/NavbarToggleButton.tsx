import React from "react";
import HomeButton from "./ui/HomeButton";

// Definición de las propiedades que el componente recibe
interface NavbarToggleButtonProps {
    isExpanded: boolean; // Indica si el navbar está expandido o colapsado
    toggleNavbar: () => void; // Función para alternar el estado del navbar
    className?: string; // Clases adicionales opcionales para personalizar el estilo
}

const NavbarToggleButton: React.FC<NavbarToggleButtonProps> = ({ isExpanded, toggleNavbar }) => {
    return (
        // Contenedor principal del botón de alternar, con estilos visuales
        <div className="flex items-center gap-2 relative p-2 m-4 rounded-lg backdrop-blur-md bg-white/30 shadow-lg z-50">
            {/* Botón para redirigir al Home */}
            <HomeButton />

            {/* Botón para alternar la expansión del Navbar */}
            <button
                onClick={toggleNavbar} // Llama a la función para alternar el estado
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg focus:outline-none border-0 hover:bg-white/50"
            >
                {/* Ícono dinámico que cambia según el estado de expansión */}
                <span className="text-xl md:text-2xl font-bold text-primary">
                    {isExpanded ? "<" : ">"}
                </span>
            </button>
        </div>
    );
};

export default NavbarToggleButton;
