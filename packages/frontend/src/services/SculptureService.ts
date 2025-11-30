/**
 * Module: SculptureService
 * Responsibilities:
 * - Handle sculpture-related API operations.
 * Collaborators:
 * - AxiosConfig
 */
import api from './axiosConfig';

export const getEsculturas = async (escultorId?: number) => {
    try {
        const queryParams = escultorId ? { params: { escultorId } } : {};
        const response = await api.get('/esculturas', queryParams);

        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error fetching sculptures');
        }
    }
};

export const getEsculturaporId = async(esculturaID: any)=>{
    try{
        const response = await api.get(`/esculturas/${esculturaID}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getEsculturasByEvent = async (eventoID: any) => {
    if (!eventoID) {
        throw new Error('Event ID not provided');
    }
    try {
        const response = await api.get(`/esculturas/evento/${eventoID}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error fetching event sculptures: ${error.message}`);
        }
        throw new Error('Unknown error fetching event sculptures');
    }
};

export const createEscultura = async (data: any) => {
    try {
        const response = await api.post('/esculturas', data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error creating sculpture: ${error.message}`);
        }
        throw new Error('Unknown error creating sculpture');
    }
}

export const updateEscultura = async (id: string, esculturaData: any) => {
    try {
        const response = await api.put(`/esculturas/${id}`, esculturaData);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error updating sculpture: ${error.message}`);
        }
        throw new Error('Unknown error updating sculpture');
    }
};

export const deleteEscultura = async (id: string) => {
    try {
        const response = await api.delete(`/esculturas/${id}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error deleting sculpture: ${error.message}`);
        }
        throw new Error('Unknown error deleting sculpture');
    }
};
