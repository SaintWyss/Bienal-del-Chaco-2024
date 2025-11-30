import api from './axiosConfig';

/**
 * Obtiene todas las esculturas.
 * @returns Las esculturas obtenidas desde el servidor.
 */
export const getEsculturas = async (escultorId?: number) => {
    try {
        // Si escultorId está presente, lo agregamos como parámetro de consulta
        const queryParams = escultorId ? { params: { escultorId } } : {};
        // Realizar la solicitud GET a la API, pasando los parámetros si se proporcionaron
        const response = await api.get('/esculturas', queryParams);

        return response.data; // Devuelve los datos recibidos de la API
    } catch (error: unknown) {
        // Manejo de error detallado
        if (error instanceof Error) {
            // Si el error es una instancia de Error, lo lanzamos con el mensaje correspondiente
            throw new Error(error.message);
        } else {
            // Si el error es desconocido, lanzamos un error genérico
            throw new Error('Error desconocido al obtener esculturas');
        }
    }
};


export const getEsculturaporId = async(esculturaID: any)=>{
    try{
        const response = await api.get(`/esculturas/${esculturaID}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

/**
 * Obtiene las esculturas asociadas a un evento específico.
 * @param eventoID El ID del evento para obtener las esculturas asociadas.
 * @returns Las esculturas asociadas al evento.
 * @throws Error si el eventoID no es proporcionado.
 */
export const getEsculturasByEvent = async (eventoID: any) => {
    if (!eventoID) {
        throw new Error('Evento ID no proporcionado');
    }
    try {
        const response = await api.get(`/esculturas/evento/${eventoID}`);
        return response.data; // Devuelve las esculturas del evento
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener esculturas del evento: ${error.message}`);
        }
        throw new Error('Error desconocido al obtener esculturas del evento');
    }
};

/**
 * Crea una nueva escultura.
 * @param data Los datos de la escultura que se desea crear.
 * @returns La escultura creada.
 */
export const createEscultura = async (data: any) => {
    try {
        const response = await api.post('/esculturas', data); // Llamada al backend
        return response.data; // Devuelve los datos de la escultura creada
    } catch (error: unknown) {
        // Manejo de errores
        if (error instanceof Error) {
            throw new Error(`Error al crear escultura: ${error.message}`);
        }
        throw new Error('Error desconocido al crear escultura');
    }
}

/**
 * Actualiza una escultura existente.
 * @param id El ID de la escultura que se desea actualizar.
 * @param esculturaData Los nuevos datos para la escultura.
 * @returns La escultura actualizada.
 */
export const updateEscultura = async (id: string, esculturaData: any) => {
    try {
        const response = await api.put(`/esculturas/${id}`, esculturaData);
        return response.data; // Devuelve la escultura actualizada
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error al actualizar escultura: ${error.message}`);
        }
        throw new Error('Error desconocido al actualizar escultura');
    }
};

/**
 * Elimina una escultura.
 * @param id El ID de la escultura que se desea eliminar.
 * @returns Los datos de la escultura eliminada.
 */
export const deleteEscultura = async (id: string) => {
    try {
        const response = await api.delete(`/esculturas/${id}`);
        return response.data; // Devuelve los datos de la escultura eliminada
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error al eliminar escultura: ${error.message}`);
        }
        throw new Error('Error desconocido al eliminar escultura');
    }
};
