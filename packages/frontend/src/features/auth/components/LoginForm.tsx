import React, { useState } from 'react';

interface LoginFormProps {
    onSubmit: (username: string, password: string) => void;
    loading: boolean;
    error: string | null;
    onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmit, loading, error, onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Formulario enviado con:', { username, password });

        if (username && password) {
            onSubmit(username, password); // Llama a la función de inicio de sesión
        } else {
            alert('Por favor, completa ambos campos.');
            console.warn('Campos vacíos:', { username, password });
        }
    };

    return (
        <div
            className="max-w-md w-full bg-gradient-to-r from-purple-400 to-blue-600 rounded-md shadow-xl overflow-hidden p-8 space-y-8">
            <h2 className="text-center text-4xl font-extrabold text-white">Bienvenido</h2>
            <p className="text-center text-white">
                Inicia sesión con tu cuenta
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <input
                        id="username"
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-300"
                    />
                    <label htmlFor="username"
                           className="absolute left-0 -top-3.5 text-gray-300 text-sm peer-focus:-top-3.5 peer-focus:text-purple-200 peer-focus:text-sm"
                    >Usuario</label>

                </div>
                <div className="relative">
                    <input
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-300"
                    />
                    <label htmlFor="password"
                           className="absolute left-0 -top-3.5 text-gray-300 text-sm peer-focus:-top-3.5 peer-focus:text-purple-200 peer-focus:text-sm">Contraseña</label>
                </div>
                {error && <p className="text-red-200 text-sm">{error}</p>}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full ${loading ? 'bg-gray-400' : 'bg-purple-400'} w-full py-2 px-4 bg-purple-400 hover:bg-purple-600 rounded-md shadow-lg text-white font-semibold transition duration-200`}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </div>
                <div className="text-center text-gray-300">
                    ¿No tienes una cuenta?
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onSwitchToRegister();
                        }}
                        className="text-purple-200 hover:underline focus:outline-none ml-2"
                    >
                        Registrarse
                    </button>
                </div>

            </form>
        </div>
    );
};

export default LoginForm;
