// tokenService maneja el almacenamiento y recuperación de datos en localStorage.
export const tokenService = {
    // Establece el token en localStorage.
    setToken: (token: string): void => localStorage.setItem('token', token),

    // Obtiene el token desde localStorage.
    getToken: (): string | null => localStorage.getItem('token'),

    // Elimina el token de localStorage.
    removeToken: (): void => localStorage.removeItem('token'),

    // Establece el rol del usuario en localStorage.
    setRole: (role: string): void => localStorage.setItem('role', role),

    // Obtiene el rol del usuario desde localStorage.
    getRole: (): string | null => localStorage.getItem('role'),

    // Elimina el rol del usuario de localStorage.
    removeRole: (): void => localStorage.removeItem('role'),

    // Establece el nombre de usuario en localStorage.
    setUser: (username: string): void => localStorage.setItem('username', username),

    // Obtiene el nombre de usuario desde localStorage.
    getUser: (): string | null => localStorage.getItem('username'),

    // Elimina el nombre de usuario de localStorage.
    removeUser: (): void => localStorage.removeItem('username'),

    // Establece los datos del usuario (nombre y rol) en localStorage.
    setUserData: (data: { username: string; role: string }): void => {
        localStorage.setItem('user', JSON.stringify(data)); // Guardamos el objeto como JSON
    },

    // Obtiene los datos del usuario desde localStorage.
    getUserData: (): { username: string; role: string } | null => {
        const data = localStorage.getItem('user'); // Obtenemos el string JSON
        return data ? JSON.parse(data) : null; // Parseamos y devolvemos los datos
    },

    // Elimina los datos del usuario de localStorage.
    removeUserData: (): void => localStorage.removeItem('user'),
};

// Función de cierre de sesión: elimina token y datos de usuario, luego recarga la página.
export const logout = (): void => {
    tokenService.removeToken();      // Eliminamos el token
    tokenService.removeUserData();   // Eliminamos los datos del usuario
    window.location.reload();        // Recargamos la página para limpiar el estado
};
