import { useState, useEffect } from "react";

/**
 * Hook personalizado para verificar si una consulta de medios (media query) se cumple.
 *
 * @param query - Cadena de consulta de medios (ej. "(min-width: 768px)")
 * @returns `true` si la consulta de medios coincide, `false` de lo contrario.
 */
const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false); // Estado que indica si la consulta coincide

    useEffect(() => {
        // Crear el objeto de consulta de medios
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches); // Inicializar el estado según la coincidencia actual

        // Función manejadora para actualizar el estado cuando cambie la consulta
        const handler = () => setMatches(mediaQuery.matches);

        // Agregar el evento de cambio
        mediaQuery.addEventListener("change", handler);

        // Limpiar el evento al desmontar el componente
        return () => mediaQuery.removeEventListener("change", handler);
    }, [query]); // Se ejecuta cada vez que cambia la consulta

    return matches; // Retorna si la consulta coincide o no
};

export default useMediaQuery;