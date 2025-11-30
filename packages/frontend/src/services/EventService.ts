/**
 * Module: EventService
 * Responsibilities:
 * - Handle event-related API operations.
 * Collaborators:
 * - AxiosConfig
 */
import api from './axiosConfig';

export const getEventos = async (): Promise<any[]> => {
    try {
        const response = await api.get('/eventos');
        return response.data.eventos;
    } catch (error) {
        throw new Error('Error fetching events');
    }
};

export const getEventoById = async (id: string): Promise<any> => {
    try {
        const response = await api.get(`/eventos/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching event with ID: ${id}`);
    }
};

export const createEvento = async (eventoData: any): Promise<any> => {
    try {
        const response = await api.post('/eventos', eventoData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating event');
    }
};

export const updateEvento = async (id: string, eventoData: any): Promise<any> => {
    try {
        const response = await api.put(`/eventos/${id}`, eventoData);
        return response.data.eventos;
    } catch (error) {
        throw new Error(`Error updating event with ID: ${id}`);
    }
};

export const deleteEvento = async (id: string): Promise<any> => {
    try {
        const response = await api.delete(`/eventos/${id}`);
        return response.data.eventos;
    } catch (error) {
        throw new Error(`Error deleting event with ID: ${id}`);
    }
};