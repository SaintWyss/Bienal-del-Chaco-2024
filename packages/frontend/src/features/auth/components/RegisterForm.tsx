import { useState } from 'react';
import { registerUser } from "../../../services/AuthService.ts";

interface RegisterFormProps {
    onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
    const [nombre, setNombre] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Verificar que los campos no estén vacíos
        if (!nombre || !username || !email || !password) {
            setError('Todos los campos son obligatorios');
            setLoading(false);
            return;
        }

        try {
            const userData = { nombre, username, email, password };
            const response = await registerUser(userData);

            console.log('Usuario registrado:', response);
            window.location.href = '/login'; // Redirigir a login si es necesario

        } catch (err) {
            console.error('Error al registrar usuario:', err);
            setError('Hubo un error al registrar al usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full bg-gradient-to-r from-purple-400 to-blue-600 rounded-md shadow-xl overflow-hidden p-8 space-y-8">
            <h2 className="text-center text-4xl font-extrabold text-white">Registrarse</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-300"
                    />
                    <label htmlFor="nombre" className="absolute left-0 -top-3.5 text-gray-300 text-sm peer-focus:-top-3.5 peer-focus:text-purple-200 peer-focus:text-sm">Nombre</label>
                </div>
                <div className="relative">
                    <input
                        id="username"
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-300"
                    />
                    <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-300 text-sm peer-focus:-top-3.5 peer-focus:text-purple-200 peer-focus:text-sm">Usuario</label>
                </div>
                <div className="relative">
                    <input
                        id="email"
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-300"
                    />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-300 text-sm peer-focus:-top-3.5 peer-focus:text-purple-200 peer-focus:text-sm">Correo electrónico</label>
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
                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-300 text-sm peer-focus:-top-3.5 peer-focus:text-purple-200 peer-focus:text-sm">Contraseña</label>
                </div>
                {error && <p className="text-red-200 text-sm">{error}</p>}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full ${loading ? 'bg-gray-400' : 'bg-purple-400'} py-2 px-4 rounded-md shadow-lg text-white font-semibold transition duration-200`}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </div>
            </form>
            <div className="text-center text-gray-300">
                ¿Ya tienes una cuenta?
                <button
                    onClick={onSwitchToLogin} // Usamos la función pasada como prop para cambiar a Login
                    className="text-purple-200 hover:underline focus:outline-none ml-2"
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
};

export default RegisterForm;