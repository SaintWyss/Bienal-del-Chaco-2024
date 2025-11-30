/**
 * Module: TokenService
 * Responsibilities:
 * - Manage authentication tokens and user data in LocalStorage.
 * Collaborators:
 * - LocalStorage
 */
export const tokenService = {
    setToken: (token: string): void => localStorage.setItem('token', token),
    getToken: (): string | null => localStorage.getItem('token'),
    removeToken: (): void => localStorage.removeItem('token'),

    setRole: (role: string): void => localStorage.setItem('role', role),
    getRole: (): string | null => localStorage.getItem('role'),
    removeRole: (): void => localStorage.removeItem('role'),

    setUser: (username: string): void => localStorage.setItem('username', username),
    getUser: (): string | null => localStorage.getItem('username'),
    removeUser: (): void => localStorage.removeItem('username'),

    setUserData: (data: { username: string; role: string }): void => {
        localStorage.setItem('user', JSON.stringify(data));
    },
    getUserData: (): { username: string; role: string } | null => {
        const data = localStorage.getItem('user');
        return data ? JSON.parse(data) : null;
    },
    removeUserData: (): void => localStorage.removeItem('user'),
};

export const logout = (): void => {
    tokenService.removeToken();
    tokenService.removeUserData();
    tokenService.removeRole();
    tokenService.removeUser();
    window.location.reload();
};
