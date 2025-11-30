// src/features/user/pages/UserLoggedInMenu.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../../user/hooks/useUser';
import {logout} from "../../../services/AuthService.ts"; // Importar el hook para obtener el usuario

interface UserLoggedInMenuProps {
    username: any;
    role: string; // Puede ser 'user' o 'admin'
}

const UserLoggedInMenu: React.FC<UserLoggedInMenuProps> = ({ role, username }) => {
    // NO SE NECESITA SACAR DSP
    const { user, loading } = useUser(); // Obtener el usuario y el estado de carga
    const [isOpen, setIsOpen] = useState(false);
    console.log(user)

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLogoutClick = () => {
        logout(); // Llama a la función de logout
        window.location.reload(); // Recarga la página para actualizar el estado
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-32 h-10 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
            >
                {loading ? 'Cargando...' : username ? (
                    // Mostrar nombre del usuario si está autenticado
                    `${username} (${role === 'admin' ? 'Admin' : role === 'escultor' ? 'Escultor' : 'Usuario'})`
                ) : (
                    'Iniciar sesión'
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                        {role === 'admin' && (
                            <Link to="/adminpage" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                Panel Admin
                            </Link>
                        )}
                        { role === 'escultor' && (
                        <Link to={`/codigo-qr/${username}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                            Crear Qr
                        </Link>
                        )
                        }
                            <>
                                <button
                                    onClick={handleLogoutClick}
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Cerrar sesión
                                </button>
                            </>

                    </div>
                </div>
            )}
        </div>
    );
};

export default UserLoggedInMenu;