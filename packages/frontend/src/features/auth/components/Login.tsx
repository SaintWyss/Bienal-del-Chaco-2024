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
                // Redirige al usuario según su rol
                const destination = user.role === 'admin' ? '/AdminPage' : '/';
                navigate(destination);
                console.log('Redirigiendo a:', destination);
            } else {
                setError('Error en las credenciales, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
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
