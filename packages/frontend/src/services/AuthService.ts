import api from './axiosConfig'; // Importamos la configuración de Axios
import { tokenService } from './tokenService'; // Importamos el servicio de manejo de tokens

// Función para decodificar el token JWT y obtener su contenido
const decodeToken = (token: string) => {
    const base64Url = token.split('.')[1]; // El token JWT tiene 3 partes separadas por puntos, la segunda parte contiene la información codificada
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplazamos caracteres para una decodificación válida
    const jsonPayload = decodeURIComponent(
        atob(base64) // Decodificamos el base64 en texto
            .split('') // Convertimos cada carácter en un array
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`) // Escapamos los caracteres
            .join('') // Unimos todo el array en un solo string
    );
    return JSON.parse(jsonPayload); // Convertimos el string JSON en objeto JavaScript
};

// Autenticación del usuario (Login)
export const login = async (username: string, password: string) => {
    try {
        // Realizamos la solicitud de autenticación al backend
        const response = await api.post('/auth/login', { username, password });

        const { token, user } = response.data; // Extraemos el token y los datos del usuario de la respuesta

        // Guardamos el token y el rol en el servicio de tokens
        tokenService.setToken(token);
        tokenService.setRole(user.role);

        return user; // Devolvemos el objeto de usuario
    } catch (error) {
        // Manejamos errores de autenticación y los lanzamos para que se manejen en otro lugar
        throw error;
    }
};

// Servicio para registrar un nuevo usuario
interface RegisterUserData {
    nombre: string;
    username: string;
    email: string;
    password: string;
}

export const registerUser = async (userData: RegisterUserData) => {
    try {
        // Realizamos la solicitud para registrar un usuario en el backend
        const response = await api.post('/auth/register', {
            ...userData, // Usamos los datos del formulario
            role: 'user',   // Rol fijo para los nuevos usuarios
            isActive: true, // El usuario se activa automáticamente
        });

        // Si la respuesta incluye un token, lo guardamos en localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Guardamos el token en localStorage
        }

        return response.data; // Devolvemos la respuesta completa
    } catch (err) {
        // Capturamos el error y lanzamos un mensaje general
        throw new Error('Hubo un error al registrar al usuario');
    }
};

// Cerrar sesión (Logout)
export const logout = () => {
    // Eliminamos el token, rol y usuario del almacenamiento
    tokenService.removeToken();
    tokenService.removeRole();
    tokenService.removeUser();
};

// Obtener datos del usuario actual
export const getUser = async () => {
    try {
        const token = tokenService.getToken(); // Obtenemos el token actual
        if (!token) throw new Error("No hay token de autenticación"); // Verificamos que el token exista

        // Decodificamos el token para obtener el userId
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id; // Obtenemos el ID del usuario del token

        // Realizamos la solicitud para obtener los datos del usuario usando el userId
        const response = await api.get(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }, // Incluimos el token en los headers
        });

        return response.data.user; // Devolvemos los datos del usuario
    } catch (error: any) {
        // Manejamos cualquier error que ocurra al obtener los datos del usuario
        return null; // Si ocurre un error, devolvemos null
    }
};

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
    const token = tokenService.getToken(); // Verificamos si el token existe
    return !!token; // Devuelve true si hay un token, false si no
};

// Obtener el rol del usuario actual
export const getRole = () => tokenService.getRole();// Obtenemos el rol del usuario desde el servicio de token
export const getName = () => tokenService.getUser();