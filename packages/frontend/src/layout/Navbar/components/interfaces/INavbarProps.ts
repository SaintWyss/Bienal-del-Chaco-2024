import { INavbarLink } from "./INavigationLink.ts";

// Definición de las propiedades que el componente NavbarLinks recibe
export interface NavbarLinksProps {
    links: INavbarLink[]; // Lista de enlaces del navbar, cada uno debe cumplir la interfaz INavbarLink
    closeNavbar: () => void; // Función para cerrar el navbar cuando un enlace es seleccionado
    isVertical?: boolean; // Indica si el navbar debe ser vertical (opcional)
    toggleNavbar?: () => void; // Función opcional para alternar el estado de expansión del navbar
    onLinkClick?: (index: number) => void; // Función opcional que se ejecuta cuando se hace clic en un enlace
}