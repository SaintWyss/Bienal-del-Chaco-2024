// Importación del archivo de configuración de Axios
import api from './axiosConfig';

/**
 * Obtiene todos los eventos.
 * @returns Lista de eventos obtenida del servidor.
 */
export const getEventos = async (): Promise<any[]> => {
    try {
        // Realiza la solicitud GET para obtener todos los eventos.
        const response = await api.get('/eventos');
        return response.data.eventos; // Devuelve la lista de eventos del cuerpo de la respuesta.
    } catch (error) {
        // Solo capturamos errores mínimos, como un fallo de red o error de servidor.
        throw new Error('Error al obtener los eventos');
    }
};

/**
 * Obtiene un evento específico por su ID.
 * @param id ID del evento a obtener.
 * @returns Evento específico obtenido del servidor.
 */
export const getEventoById = async (id: string): Promise<any> => {
    try {
        // Realiza la solicitud GET para obtener un evento por ID.
        const response = await api.get(`/eventos/${id}`);
        return response.data; // Devuelve el evento del cuerpo de la respuesta.
    } catch (error) {
        throw new Error(`Error al obtener el evento con ID: ${id}`);
    }
};

/**
 * Crea un nuevo evento.
 * @param eventoData Datos del nuevo evento a crear.
 * @returns Datos del evento recién creado.
 */
export const createEvento = async (eventoData: any): Promise<any> => {
    try {
        // Realiza la solicitud POST para crear un nuevo evento.
        const response = await api.post('/eventos', eventoData);
        return response.data; // Devuelve los datos del evento creado.
    } catch (error) {
        throw new Error('Error al crear el evento');
    }
};

/**
 * Actualiza un evento existente.
 * @param id ID del evento a actualizar.
 * @param eventoData Nuevos datos del evento.
 * @returns Datos del evento actualizado.
 */
export const updateEvento = async (id: string, eventoData: any): Promise<any> => {
    try {
        // Realiza la solicitud PUT para actualizar el evento con el ID proporcionado.
        const response = await api.put(`/eventos/${id}`, eventoData);
        return response.data.eventos; // Devuelve el evento actualizado.
    } catch (error) {
        throw new Error(`Error al actualizar el evento con ID: ${id}`);
    }
};

/**
 * Elimina un evento.
 * @param id ID del evento a eliminar.
 * @returns Resultado de la eliminación del evento.
 */
export const deleteEvento = async (id: string): Promise<any> => {
    try {
        // Realiza la solicitud DELETE para eliminar el evento con el ID proporcionado.
        const response = await api.delete(`/eventos/${id}`);
        return response.data.eventos; // Devuelve el resultado de la eliminación.
    } catch (error) {
        throw new Error(`Error al eliminar el evento con ID: ${id}`);
    }
};