/**
 * Module: AuthService
 * Responsibilities:
 * - Handle user authentication (login, register, logout).
 * - Manage user session data.
 * Collaborators:
 * - AxiosConfig
 * - TokenService
 */
import api from './axiosConfig';
import { tokenService } from './tokenService';

const decodeToken = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );
    return JSON.parse(jsonPayload);
};

export const login = async (username: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        const { token, user } = response.data;

        tokenService.setToken(token);
        tokenService.setRole(user.role);

        return user;
    } catch (error) {
        throw error;
    }
};

interface RegisterUserData {
    nombre: string;
    username: string;
    email: string;
    password: string;
}

export const registerUser = async (userData: RegisterUserData) => {
    try {
        const response = await api.post('/auth/register', {
            ...userData,
            role: 'user',
            isActive: true,
        });

        if (response.data.token) {
            tokenService.setToken(response.data.token);
        }

        return response.data;
    } catch (err) {
        throw new Error('Error registering user');
    }
};

export const logout = () => {
    tokenService.removeToken();
    tokenService.removeRole();
    tokenService.removeUser();
};

export const getUser = async () => {
    try {
        const token = tokenService.getToken();
        if (!token) throw new Error("No authentication token found");

        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;

        const response = await api.get(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.user;
    } catch (error: any) {
        return null;
    }
};

export const isAuthenticated = () => {
    const token = tokenService.getToken();
    return !!token;
};

export const getRole = () => tokenService.getRole();
export const getName = () => tokenService.getUser();