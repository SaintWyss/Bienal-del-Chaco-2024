import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../../../services/userService';
import { User } from '../types/userTypes';

const useUser = () => {
    const [user, setUser] = useState<User | null>(null); // Estado del usuario
    const [loading, setLoading] = useState<boolean>(true); // Indicador de carga
    const [error, setError] = useState<string | null>(null); // Estado del error

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true); // Inicia la carga
                const currentUser = await getCurrentUser();
                setUser(currentUser); // Establece el usuario si se obtiene correctamente
                setError(null); // Limpia cualquier error previo
            } catch (err: any) {
                console.error('Error fetching user:', err);
                setUser(null); // Asegúrate de limpiar el usuario si hay un error
                setError(err.message || 'Error fetching user'); // Establece el mensaje de error
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null); // Limpia el usuario del estado
        } catch (err: any) {
            console.error('Error during logout:', err);
            setError(err.message || 'Error during logout'); // Maneja el error
        }
    };

    return { user, loading, error, handleLogout };
};

export default useUser;