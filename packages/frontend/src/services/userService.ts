import api from './axiosConfig';
import { User } from '../features/user/types/userTypes';

// Función para obtener el usuario actual
export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const response = await api.get('/users'); // Verifica que esta ruta obtenga el usuario actual
        return response.data;
    } catch (error) {
        // Manejo de errores mínimo
        return null;
    }
};

// Función para obtener la lista de usuarios
export const fetchUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data.users; // Asegúrate de acceder correctamente a la propiedad 'users' en la respuesta
    } catch (error) {
        throw new Error('Error en la carga de usuarios'); // Solo lanzamos el error sin imprimir en consola
    }
};

// Función para actualizar el rol de un usuario
export const updateUserRole = async (userId: string, newRole: string) => {
    try {
        const response = await api.put(`/roles/${userId}`, { role: newRole }); // Confirmar la ruta correcta para roles
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar el rol'); // Manejamos el error de manera sencilla
    }
};

// Función para cerrar sesión
export const logout = async (): Promise<void> => {
    try {
        await api.post('/auth/logout'); // Confirmar la ruta para cerrar sesión
    } catch (error) {
        throw new Error('Error al cerrar sesión'); // Solo lanzamos el error sin loguearlo
    }
};

// Función para eliminar un usuario
export const deleteUser = async (userId: number) => {
    try {
        const response = await api.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error al eliminar el usuario'); // Manejamos el error de forma genérica
    }
};