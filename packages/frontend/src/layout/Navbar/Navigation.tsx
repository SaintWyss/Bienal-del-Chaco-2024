import React, { useState } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { INavbarLink } from "./components/interfaces/INavigationLink";
import useMediaQuery from "./hooks/useMediaQuery.ts";

interface NavigationProps {
    links: INavbarLink[], // Enlaces de navegación
    onLinkClick?: (index: number) => void; // Callback cuando se hace clic en un enlace
}

const Navigation: React.FC<NavigationProps> = ({ links, onLinkClick }) => {
    const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar la expansión de la barra lateral
    const isDesktop = useMediaQuery("(min-width: 768px)"); // Detecta si es desktop (pantalla mayor o igual a 768px)

    // Función para alternar el estado de expansión
    const toggleNavbar = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <>
            {/* Mostrar solo Navbar en pantallas grandes (desktop) */}
            {isDesktop && (
                <Navbar
                    links={links}
                    toggleNavbar={toggleNavbar}
                    isExpanded={isExpanded}
                    onLinkClick={onLinkClick}
                />
            )}

            {/* Mostrar solo Sidebar en pantallas pequeñas (mobile) */}
            {!isDesktop && (
                <Sidebar
                    links={links}
                    isExpanded={isExpanded}
                    closeSidebar={() => {
                        setIsExpanded((prev) => !prev); // Cerrar Sidebar si está expandido
                    }}
                    onLinkClick={onLinkClick}
                />
            )}
        </>
    );
};

export default Navigation;