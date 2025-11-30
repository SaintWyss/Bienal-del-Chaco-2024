export const navbarStyles = {
    // Contenedor principal del navbar, posicionado fijo en la parte superior
    container: "fixed top-4 left-4 right-4 z-50 rounded-lg",

    // Barra de navegación, posicionado absoluto, con sombra y transición suave
    nav: "absolute top-0 left-0 h-16 shadow-lg transition-transform duration-300 rounded-lg",

    // Estado expandido: Navbar más alto y más ancho, con espacio adicional en la parte inferior
    expanded: "w-full h-28 translate-y-0 pb-4",

    // Estado colapsado: Navbar oculto al deslizarse fuera de la vista
    collapsed: "-translate-x-full",

    // Botón para alternar el estado del navbar, circular y posicionado en la parte superior izquierda
    button: "absolute top-4 left-4 w-10 h-10 overflow-hidden rounded-full flex items-center justify-center text-primary shadow-lg z-50",
};