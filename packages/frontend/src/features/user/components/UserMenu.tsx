/**
 * Class: UserMenu
 * Description: Component that determines which user menu to display based on authentication status.
 * Responsibilities:
 *   - Fetch user role and username.
 *   - Render UserLoggedInMenu or UserLoggedOutMenu.
 * Collaborators:
 *   - AuthService: Fetches user role and details.
 *   - UserLoggedInMenu: Menu for authenticated users.
 *   - UserLoggedOutMenu: Menu for unauthenticated users.
 */
import React, { useState, useEffect } from 'react';
import { getRole, getUser } from '../../../services/AuthService.ts';
import UserLoggedInMenu from './UserLoggedInMenu.tsx';
import UserLoggedOutMenu from './UserLoggedOutMenu.tsx';

const UserMenu: React.FC = () => {
    const [role, setRole] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRole = await getRole();
                const user = await getUser();

                setRole(userRole);
                setUsername(user?.username || null);
            } catch (error) {
                // Handle error silently, user is likely not logged in
                setRole(null);
                setUsername(null);
            }
        };

        fetchUserData();
    }, []);

    if (!role) {
        return <UserLoggedOutMenu />;
    }
    return <UserLoggedInMenu role={role} username={username} />;
};

export default UserMenu;

