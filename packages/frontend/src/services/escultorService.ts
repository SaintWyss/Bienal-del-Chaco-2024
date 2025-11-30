/**
 * Module: EscultorService
 * Responsibilities:
 * - Handle sculptor-related API operations.
 * Collaborators:
 * - AxiosConfig
 */
import api from './axiosConfig';

export const fetchEscultoresConNombre = async () => {
    try {
        const response = await api.get('/escultores');
        return await Promise.all(
            response.data.map(async (escultor: any) => {
                try {
                    const userResponse = await api.get(`/users/${escultor.userId}`);
                    return {
                        ...escultor,
                        nombre: userResponse.data.usuario?.nombre || "Escultor sin Nombre",
                    };
                } catch (userError) {
                    return {
                        ...escultor,
                        nombre: "Escultor sin nombre",
                    };
                }
            })
        );
    } catch (error) {
        throw error;
    }
};

export const fetchEscultores = async () => {
    try {
        const response = await api.get('/escultores');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchEscultorById = async (userId: number): Promise<any> => {
    try {
        const response = await api.get(`/escultores/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateEscultor = async (escultor: any): Promise<any> => {
    try {
        const { userId, biografia, imagen, instagram, facebook, youtube, linkedin } = escultor;
        const updatedEscultor = { biografia, imagen, instagram, facebook, youtube, linkedin };

        const response = await api.put(`/escultores/${userId}`, updatedEscultor);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteEscultor = async (id: number) => {
    try {
        const response = await api.delete(`/escultores/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const setEscultorToUser = async (userId: string, newRole: string) => {
    try {
        const response = await api.put(`/roles/${userId}`, { role: newRole });
        return response.data;
    } catch (error) {
        throw error;
    }
};
