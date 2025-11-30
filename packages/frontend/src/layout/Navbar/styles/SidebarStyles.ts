export const sidebarStyles = {
    // Contenedor principal de la sidebar, se coloca fijo en la parte superior izquierda con fondo blanco
    container: "fixed top-0 left-0 h-0 z-40 bg-white",

    // Contenedor de la navegación, se coloca fijo y ocupa toda la altura de la pantalla
    // Se aplica un desenfoque de fondo y opacidad
    nav: "fixed top-0 left-0 h-full z-40 transition-transform duration-300 bg-white/30 backdrop-blur-lg",

    // Estilo cuando la sidebar está expandida (visible)
    expanded: "translate-x-0 w-64", // Ancho de la sidebar cuando está expandida (64px de ancho)

    // Estilo cuando la sidebar está colapsada (fuera de la vista)
    collapsed: "-translate-x-full", // Hace que la sidebar se desplace completamente hacia fuera de la pantalla

    // Botón para alternar la visibilidad de la sidebar
    // Está posicionado en la esquina superior izquierda con fondo semi-transparente y efectos de desenfoque
    button: "absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-primary bg-white/30 backdrop-blur-lg",
};
