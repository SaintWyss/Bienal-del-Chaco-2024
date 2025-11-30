import api from './axiosConfig';

// Obtener escultores con nombre de usuario
export const fetchEscultoresConNombre = async () => {
    try {
        // Realiza la solicitud GET para obtener todos los escultores
        const response = await api.get('/escultores');
        // Mapea los escultores y obtiene el nombre de usuario asociado
        return await Promise.all(
            response.data.map(async (escultor: any) => {
                try {
                    // Solicita los detalles del usuario asociado al escultor
                    const userResponse = await api.get(`/users/${escultor.userId}`);
                    return {
                        ...escultor, // Conserva los datos del escultor
                        nombre: userResponse.data.usuario?.nombre || "Escultor sin Nombre", // Asigna el nombre del usuario, o un nombre por defecto
                    };
                } catch (userError) {
                    // En caso de error al obtener el nombre del usuario, asigna un nombre por defecto
                    return {
                        ...escultor,
                        nombre: "Escultor sin nombre",
                    };
                }
            })
        ); // Devuelve la lista de escultores con nombre
    } catch (error) {
        // En caso de error al obtener los escultores, se lanza el error
        throw error;
    }
};

// Obtener todos los escultores sin nombre de usuario
export const fetchEscultores = async () => {
    try {
        const response = await api.get('/escultores'); // Solicita todos los escultores
        return response.data; // Devuelve los datos de los escultores
    } catch (error) {
        // En caso de error, lanza el error para manejo posterior
        throw error;
    }
};

// Obtener un escultor específico por ID
export const fetchEscultorById = async (userId: number): Promise<any> => {
    try {
        const response = await api.get(`/escultores/${userId}`); // Solicita un escultor específico por ID
        return response.data; // Devuelve los datos del escultor
    } catch (error) {
        // En caso de error al obtener el escultor, lanza el error
        throw error;
    }
};

// Actualizar los datos de un escultor
export const updateEscultor = async (escultor: any): Promise<any> => {
    try {
        // Extrae solo los campos editables para evitar modificar otros valores no autorizados
        const { userId, biografia, imagen, instagram, facebook, youtube, linkedin } = escultor;
        const updatedEscultor = { biografia, imagen, instagram, facebook, youtube, linkedin };

        // Solicita la actualización de los datos del escultor
        const response = await api.put(`/escultores/${userId}`, updatedEscultor);
        return response.data; // Devuelve los datos actualizados del escultor
    } catch (error) {
        // En caso de error al actualizar, lanza el error para manejo posterior
        throw error;
    }
};

// Eliminar un escultor por ID
export const deleteEscultor = async (id: number) => {
    try {
        // Solicita la eliminación del escultor por ID
        const response = await api.delete(`/escultores/${id}`);
        return response.data; // Devuelve la respuesta de la eliminación
    } catch (error) {
        // En caso de error al eliminar, lanza el error para manejo posterior
        throw error;
    }
};

// Asignar un nuevo rol a un usuario
export const setEscultorToUser = async (userId: string, newRole: string) => {
    try {
        // Solicita la actualización del rol del usuario
        const response = await api.put(`/roles/${userId}`, { role: newRole });
        return response.data; // Devuelve la respuesta de la actualización del rol
    } catch (error) {
        // En caso de error al actualizar el rol, lanza el error para manejo posterior
        throw error;
    }
};
