import React from "react";
import { INavbarLink } from "../interfaces/INavigationLink.ts"; // Importa la interfaz de los enlaces de la barra de navegación
import { buttonLinkStyles } from "../styles/ButtonLinkStyle.ts"; // Importa los estilos de los botones de enlace

// Definición de las propiedades que recibe el componente NavbarLinkItem
interface NavbarLinkItemProps {
    link: INavbarLink; // Enlace que se va a renderizar
    icon: React.ReactNode; // Icono que se va a mostrar junto al enlace
    closeNavbar: () => void; // Función para cerrar el navbar al hacer clic
}

const NavbarLinkItem: React.FC<NavbarLinkItemProps> = ({ link, icon, closeNavbar }) => {
    return (
        <li className="w-full relative">
            {/* Verifica si el enlace tiene un 'id' o 'href', y ajusta el renderizado */}
            {"id" in link ? (
                // Enlace con un ID para anclaje dentro de la misma página
                <a
                    href={`#${link.id}`} // Enlace a la sección con el id correspondiente
                    onClick={closeNavbar} // Cierra el navbar al hacer clic
                    className={`${buttonLinkStyles.base} ${buttonLinkStyles.hover}`} // Estilos del enlace
                >
                    <span className={`${buttonLinkStyles.icon}`}>{icon} {link.label}</span> {/* Muestra el icono y la etiqueta del enlace */}
                    <span className={buttonLinkStyles.blobs.orange}></span>
                    <span className={buttonLinkStyles.blobs.purple}></span>
                    <span className={buttonLinkStyles.blobs.pink}></span>
                    <span className={buttonLinkStyles.blobs.blue}></span>
                </a>
            ) : (
                // Enlace externo con href
                <a
                    href={link.href} // URL del enlace externo
                    target="_blank" // Abre en una nueva pestaña
                    rel="noopener noreferrer" // Seguridad para el enlace externo
                    className={`${buttonLinkStyles.base} ${buttonLinkStyles.hover}`} // Estilos del enlace
                >
                    {link.label} {/* Muestra solo la etiqueta del enlace */}
                </a>
            )}
        </li>
    );
};

export default NavbarLinkItem;