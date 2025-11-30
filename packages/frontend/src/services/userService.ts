/**
 * Module: UserService
 * Responsibilities:
 * - Handle user-related API operations.
 * Collaborators:
 * - AxiosConfig
 */
import api from './axiosConfig';
import { User } from '../features/user/types/userTypes';

export const fetchUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data.users;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

export const updateUserRole = async (userId: string, newRole: string) => {
    try {
        const response = await api.put(`/roles/${userId}`, { role: newRole });
        return response.data;
    } catch (error) {
        throw new Error('Error updating user role');
    }
};

export const deleteUser = async (userId: number) => {
    try {
        const response = await api.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting user');
    }
};