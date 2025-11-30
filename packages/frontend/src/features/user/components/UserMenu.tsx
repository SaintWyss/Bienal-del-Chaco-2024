import React, { useState, useEffect } from 'react'; // Asegúrate de importar useEffect aquí
import { getRole, getUser } from '../../../services/AuthService.ts'; // Importar las funciones asincrónicas
import UserLoggedInMenu from './UserLoggedInMenu.tsx';
import UserLoggedOutMenu from './UserLoggedOutMenu.tsx';

const UserMenu: React.FC = () => {
    // Define los estados para el rol y el nombre de usuario
    const [role, setRole] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        // Llamar a las funciones asincrónicas cuando el componente se monta
        const fetchUserData = async () => {
            const userRole = await getRole(); // Obtener el rol del usuario
            const user = await getUser(); // Obtener el nombre de usuario

            setRole(userRole);  // Establecer el rol
            setUsername(user.username); // Establecer el nombre de usuario
        };

        fetchUserData();  // Llamar a la función para obtener datos
    }, []);  // Solo se ejecuta una vez cuando el componente se monta

    if (!role) {
        return <UserLoggedOutMenu />; // Si no hay rol, renderiza el menú de no logueado
    }
    return <UserLoggedInMenu role={role} username={username}/>; // Si hay rol, renderiza el menú de logueado
};

export default UserMenu;

