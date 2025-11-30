/**
 * Class: Login
 * Description: Container component for the login process. Handles the interaction with the AuthService and navigation upon success.
 * Responsibilities:
 *   - Manage login state (loading, error).
 *   - Call the login service.
 *   - Redirect the user based on their role.
 * Collaborators:
 *   - AuthService: Performs the login API call.
 *   - LoginForm: UI component for the login form.
 *   - useNavigate: React Router hook for navigation.
 */
import React, { useState } from 'react';
import { login } from '../../../services/AuthService.ts';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

interface LoginProps {
    onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const user = await login(username, password);
            if (user) {
                // Redirect user based on role
                const destination = user.role === 'admin' ? '/AdminPage' : '/';
                navigate(destination);
            } else {
                setError('Error en las credenciales, inténtalo de nuevo.');
            }
        } catch (error) {
            setError('Error al iniciar sesión. Por favor, revisa tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            error={error}
            onSwitchToRegister={onSwitchToRegister}
        />
    );
};

export default Login;
