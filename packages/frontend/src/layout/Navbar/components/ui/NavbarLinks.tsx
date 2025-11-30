import React from "react";
import { buttonLinkStyles } from "../styles/ButtonLinkStyle.ts";
import { FaHome, FaMapMarkedAlt, FaUsers, FaShapes, FaCalendarAlt } from "react-icons/fa";
import { NavbarLinksProps } from "../interfaces/INavbarProps.ts";
import UserMenu from "../../../../features/user/components/UserMenu.tsx"; // Componente para el menú del usuario

const NavbarLinks: React.FC<NavbarLinksProps> = ({
                                                     links,
                                                     closeNavbar,
                                                     isVertical = false,
                                                     onLinkClick,
                                                 }) => {
    // Define íconos asociados a cada link usando un objeto clave-valor
    const icons: { [key: string]: React.ReactNode } = {
        hero: <FaHome />,
        eventos: <FaCalendarAlt />,
        esculturas: <FaShapes />,
        escultores: <FaUsers />,
        maps: <FaMapMarkedAlt />,
    };

    return (
        // Contenedor de los enlaces con soporte para diseño vertical u horizontal
        <ul
            className={`flex ${isVertical ? "flex-col items-center" : "items-center"} gap-4 p-4 list-none`}
        >
            {/* Itera sobre los enlaces y los renderiza dinámicamente */}
            {links.map((link, index) => (
                <li key={index} className="relative group">
                    {"id" in link ? (
                        // Enlace interno con funcionalidad para cerrar el navbar al hacer clic
                        <a
                            href={`#${link.id}`}
                            onClick={(e) => {
                                e.preventDefault(); // Previene el redireccionamiento por defecto
                                if (onLinkClick) onLinkClick(link.index ?? 0); // Usa 0 si `link.index` es undefined. Llama a la función para manejar el clic en el enlace
                                if (closeNavbar) closeNavbar(); // Cierra el navbar si está habilitado
                            }}
                            className={`${buttonLinkStyles.base} ${buttonLinkStyles.hover}`}
                        >
                            {/* Muestra el ícono y el texto del enlace */}
                            <span className={`${buttonLinkStyles.icon}`}>
                                {icons[link.id]} {link.label}
                            </span>

                            {/* Animaciones de blobs con colores dinámicos */}
                            <span
                                className={`${buttonLinkStyles.blobs.orange} group-hover:bg-[#0061ff] group-hover:scale-130`}
                            ></span>
                            <span
                                className={`${buttonLinkStyles.blobs.purple} group-hover:bg-[#ff1b6b] group-hover:scale-130`}
                            ></span>
                            <span
                                className={`${buttonLinkStyles.blobs.pink} group-hover:bg-[#bf0fff] group-hover:scale-130`}
                            ></span>
                            <span
                                className={`${buttonLinkStyles.blobs.blue} group-hover:bg-[#ff930f] group-hover:scale-130`}
                            ></span>
                        </a>
                    ) : (
                        // Enlace externo con soporte para abrir en una nueva pestaña
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${buttonLinkStyles.base} ${buttonLinkStyles.hover}`}
                        >
                            {link.label}
                        </a>
                    )}
                </li>
            ))}

            {/* Componente adicional para mostrar el menú del usuario */}
            <li>
                <UserMenu />
            </li>
        </ul>
    );
};

export default NavbarLinks;