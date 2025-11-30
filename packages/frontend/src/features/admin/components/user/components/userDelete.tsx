import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../../../../services/userService";

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

const UserDelete: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUsers();
                // Filtrar los usuarios para excluir a los que tienen el rol "admin"
                const filteredUsers = Array.isArray(data)
                    ? data.filter((user: User) => user.role !== "admin")
                    : (data.users || []).filter((user: User) => user.role !== "admin");

                setUsers(filteredUsers);
            } catch {
                setError("Error al cargar la lista de usuarios");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (userId: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                await deleteUser(userId);  // Llamada a la función de eliminación
                setUsers(users.filter(user => user.id !== userId));  // Eliminar de la lista
            } catch {
                setError("Error al eliminar el usuario");
            }
        }
    };

    if (loading) return <p className="text-center text-lg">Cargando usuarios...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Eliminar Usuarios
            </h3>
            <div className="overflow-y-auto max-h-96">
                <table className="w-full border-collapse rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white">
                    <tr>
                        <th className="p-4 text-left">Username</th>
                        <th className="p-4 text-left">Correo</th>
                        <th className="p-4 text-left">Rol</th>
                        <th className="p-4 text-left">Acciones</th> {/* Columna para acciones */}
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr
                                key={user.id}
                                className="odd:bg-gray-50 even:bg-gray-100 hover:bg-indigo-100 transition-colors duration-200"
                            >
                                <td className="p-4 text-gray-800">{user.username}</td>
                                <td className="p-4 text-gray-800">{user.email}</td>
                                <td className="p-4 text-gray-800">{user.role}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="p-6 text-center text-gray-500">
                                No hay usuarios disponibles
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDelete;