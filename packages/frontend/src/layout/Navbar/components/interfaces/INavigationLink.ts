// Interfaz para un enlace interno (con navegación dentro de la misma aplicación)
export interface IInternalLink {
    id: string; // Identificador único para el enlace, necesario para la navegación interna
    label: string; // El texto que se mostrará para el enlace
    index?: number; // (Opcional) Un índice que puede ser usado para ordenar o identificar el enlace en una lista
    icon?: React.ReactNode; // (Opcional) Un icono que se puede asociar con el enlace
}

// Interfaz para un enlace externo (con navegación fuera de la aplicación)
export interface IExternalLink {
    href: string; // URL a la que se redirigirá el enlace
    label: string; // El texto que se mostrará para el enlace
    icon?: React.ReactNode; // (Opcional) Un icono que se puede asociar con el enlace
}

// Tipo que permite que un enlace sea interno o externo
export type INavbarLink = IInternalLink | IExternalLink;