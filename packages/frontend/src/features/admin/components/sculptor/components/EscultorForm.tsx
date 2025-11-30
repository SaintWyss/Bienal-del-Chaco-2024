import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../../../../services/userService.ts';
import { setEscultorToUser } from '../../../../../services/escultorService.ts';

const EscultorForm: React.FC = () => {
    // Estado para manejar los usuarios y el usuario seleccionado
    const [usuarios, setUsuarios] = useState<{ id: string; username: string; role: string }[]>([]);
    const [usuarioId, setUsuarioId] = useState<string | null>(null);
    const [error, setError] = useState<string>('');

    // useEffect para obtener los usuarios al montar el componente
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const usuariosData = await fetchUsers();
                // Filtrar usuarios que no sean escultores ni administradores
                const usuariosFiltrados = usuariosData.filter(
                    (usuario: { role: string }) => usuario.role !== 'admin' && usuario.role !== 'escultor'
                );
                setUsuarios(usuariosFiltrados); // Actualizar el estado con los usuarios filtrados
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
                setError('No se pudieron cargar los usuarios. Intenta nuevamente.');
            }
        };

        fetchUsuarios();
    }, []);

    // Manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!usuarioId) {
            setError('Por favor, selecciona un usuario.');
            return;
        }

        try {
            await setEscultorToUser(usuarioId, 'escultor');
            alert('El usuario ha sido convertido en escultor con éxito.');
            setUsuarioId(null); // Limpiar selección
            // Actualizar la lista de usuarios excluyendo al que ya se convirtió en escultor
            setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== usuarioId));
        } catch (error) {
            console.error('Error al crear escultor:', error);
            setError('No se pudo crear el escultor. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Crear Escultor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="usuario" className="block text-sm font-medium">
                        Seleccionar Usuario
                    </label>
                    <select
                        id="usuario"
                        value={usuarioId || ''}
                        onChange={(e) => setUsuarioId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="" disabled>
                            -- Seleccionar --
                        </option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.username}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Convertir en Escultor
                </button>
            </form>
        </div>
    );
};

export default EscultorForm;
