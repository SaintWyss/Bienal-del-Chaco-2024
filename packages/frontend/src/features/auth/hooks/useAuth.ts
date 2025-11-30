import { login, logout, getUser } from "../../../services/AuthService";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Define el tipo de usuario
interface User {
    id: number;
    username: string;
    email?: string;
    role?: string;
}

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null); // Estado del usuario
    const [error, setError] = useState<string | null>(null); // Estado de errores
    const navigate = useNavigate(); // Navegación

    // Función para manejar el login
    const handleLogin = useCallback(async (username: string, password: string) => {
        try {
            const loggedInUser = await login(username, password); // Llama al servicio
            if (loggedInUser) {
                setUser(loggedInUser); // Guarda el usuario autenticado
                setError(null); // Limpia errores
            }
        } catch (err) {
            setError("Error al iniciar sesión"); // Maneja errores
        }
    }, []);

    // Función para manejar el logout
    const handleLogout = useCallback(() => {
        try {
            logout(); // Limpia token y rol
            setUser(null); // Limpia el estado
            navigate("/"); // Redirige a la página principal
        } catch (err) {
            setError("Error al cerrar sesión"); // Maneja errores
        }
    }, [navigate]);

    // Función para obtener el usuario actual
    const fetchUser = useCallback(async () => {
        try {
            const currentUser = await getUser(); // Llama al servicio
            setUser(currentUser); // Guarda el usuario actual
        } catch (err) {
            console.log("No se pudo obtener el usuario o no hay sesión activa.");
            setUser(null); // Limpia el estado
        }
    }, []);

    return { user, error, handleLogin, handleLogout, fetchUser }; // Devuelve el estado y las funciones
};

export default useAuth;