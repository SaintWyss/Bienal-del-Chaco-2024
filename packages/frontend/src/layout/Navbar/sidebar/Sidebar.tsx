import React from "react";
import { INavbarLink } from "../components/interfaces/INavigationLink";
import { sidebarStyles } from "../styles/SidebarStyles";
import SidebarToggleButton from "../components/SidebarToggleButton.tsx";
import NavbarLinks from "../components/ui/NavbarLinks.tsx";

// Definimos las propiedades que recibirá el Sidebar
interface SidebarProps {
    isExpanded: boolean; // Si la sidebar está expandida
    closeSidebar: () => void; // Función para cerrar la sidebar
    links: INavbarLink[]; // Links para la navegación
    onLinkClick?: (index: number) => void; // Callback cuando se hace click en un link
}

// Componente Sidebar
const Sidebar: React.FC<SidebarProps> = ({ isExpanded, closeSidebar, links, onLinkClick }) => {
    return (
        <header className={`${sidebarStyles.container} md:flex`}>
            {/* Botón para alternar la visibilidad de la sidebar */}
            <div className="flex items-center gap-2">
                <SidebarToggleButton
                    isExpanded={isExpanded}
                    toggleNavbar={closeSidebar}
                    className="w-8 h-8"
                />
            </div>

            {/* Contenedor de navegación con la animación de deslizamiento */}
            <nav
                className={`${sidebarStyles.nav} ${
                    isExpanded ? sidebarStyles.expanded : sidebarStyles.collapsed
                }`}
            >
                {/* Contenedor de los links de la navbar con padding */}
                <div className="flex pl-12 md:gap-20 md:pr-20 pt-24">
                    <NavbarLinks
                        links={links}
                        closeNavbar={closeSidebar}
                        isVertical={true} // Los links se muestran de forma vertical
                        onLinkClick={onLinkClick}
                    />
                </div>
            </nav>
        </header>
    );
};

export default Sidebar;
