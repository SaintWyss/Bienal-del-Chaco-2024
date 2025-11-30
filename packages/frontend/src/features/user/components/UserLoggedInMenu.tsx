/**
 * Class: UserLoggedInMenu
 * Description: Dropdown menu for authenticated users.
 * Responsibilities:
 *   - Display user name and role.
 *   - Provide links to admin panel or sculptor QR generation based on role.
 *   - Handle logout.
 * Collaborators:
 *   - AuthService: Handles logout.
 *   - useUser: Hook to get user data (though props are used here).
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../../user/hooks/useUser';
import { logout } from "../../../services/AuthService.ts";

interface UserLoggedInMenuProps {
    username: string | null;
    role: string;
}

const UserLoggedInMenu: React.FC<UserLoggedInMenuProps> = ({ role, username }) => {
    const { loading } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLogoutClick = () => {
        logout();
        window.location.reload();
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-32 h-10 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
            >
                {loading ? 'Cargando...' : username ? (
                    `${username} (${role === 'admin' ? 'Admin' : role === 'escultor' ? 'Escultor' : 'Usuario'})`
                ) : (
                    'Usuario'
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
                        {role === 'escultor' && (
                            <Link to={`/codigo-qr/${username}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                Crear Qr
                            </Link>
                        )}
                        <button
                            onClick={handleLogoutClick}
                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserLoggedInMenu;
