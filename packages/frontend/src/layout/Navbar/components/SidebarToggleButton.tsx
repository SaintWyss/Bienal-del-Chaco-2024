import React from "react";
import HomeButton from "./ui/HomeButton";

// Props que recibe el componente SidebarToggleButton
interface NavbarToggleButtonProps {
    isExpanded: boolean; // Estado de expansión del sidebar o navbar
    toggleNavbar: () => void; // Función para alternar la expansión
    className?: string; // Clases adicionales opcionales para personalizar el estilo
}

const SidebarToggleButton: React.FC<NavbarToggleButtonProps> = ({ isExpanded, toggleNavbar }) => {
    return (
        // Contenedor principal del botón, con estilos para fondo, sombra y posición
        <div className="flex items-center gap-2 relative p-2 m-4 rounded-lg backdrop-blur-md bg-white/30 shadow-lg z-50">
            {/* Renderiza el botón Home solo si el navbar está expandido */}
            {isExpanded && <HomeButton />}

            {/* Botón para alternar el estado del Navbar o Sidebar */}
            <button
                onClick={toggleNavbar}
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg focus:outline-none border-0 hover:bg-white/50"
            >
                {/* Ícono que cambia según el estado de expansión */}
                <span className="text-xl md:text-2xl font-bold text-primary">
                    {isExpanded ? "<" : ">"}
                </span>
            </button>
        </div>
    );
};

export default SidebarToggleButton;