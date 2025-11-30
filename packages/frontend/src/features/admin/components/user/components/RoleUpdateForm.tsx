import React, { useEffect, useState } from "react";
import { fetchUsers, updateUserRole } from "../../../../../services/userService";

interface User {
    id: number;
    username: string;
    role: string;
}

const RoleUpdateForm: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState<number | null>(null);

    // Fetch inicial de usuarios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUsers();
                if (data && Array.isArray(data)) {
                    const filteredUsers = data.filter((user: User) => user.role !== "admin");
                    setUsers(filteredUsers);
                } else {
                    setError("Datos de usuarios no válidos.");
                }
            } catch (err) {
                setError("Error al cargar la lista de usuarios. Inténtalo más tarde.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Manejo del cambio de rol
    const handleRoleChange = async (userId: number, newRole: string) => {
        if (!["user", "escultor"].includes(newRole)) {
            alert("Rol no válido seleccionado.");
            return;
        }

        setUpdating(userId);
        try {
            await updateUserRole(userId.toString(), newRole);
            setUsers((prev) =>
                prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
            );
            alert("Rol actualizado correctamente.");
        } catch (err) {
            console.error("Error al actualizar el rol:", err);
            alert("No se pudo actualizar el rol. Por favor, inténtalo nuevamente.");
        } finally {
            setUpdating(null);
        }
    };

    if (loading) return <p className="text-center text-lg">Cargando usuarios...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-lg shadow-2xl">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Gestión de Roles de Usuarios
            </h3>
            <div className="overflow-y-auto max-h-96"> {/* Contenedor con scroll */}
                <table className="w-full border-collapse table-auto rounded-lg shadow overflow-hidden">
                    <thead className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
                    <tr>
                        <th className="p-4 text-left">Usuario</th>
                        <th className="p-4 text-left">Rol Actual</th>
                        <th className="p-4 text-center">Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr
                                key={user.id}
                                className="odd:bg-gray-50 even:bg-gray-100 hover:bg-blue-50 transition-all"
                            >
                                <td className="p-4 text-gray-800">{user.username}</td>
                                <td className="p-4 text-gray-800">{user.role}</td>
                                <td className="p-4 text-center">
                                    <select
                                        className={`p-2 w-full text-sm font-medium rounded-lg shadow-sm transition-all duration-200 ${
                                            updating === user.id
                                                ? "bg-gray-200 border-blue-400 text-gray-500 cursor-not-allowed"
                                                : "bg-white border-gray-300 text-gray-700 hover:border-blue-500 focus:ring focus:ring-blue-300"
                                        }`}
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        disabled={updating === user.id}
                                    >
                                        <option value="user">User</option>
                                        <option value="escultor">Escultor</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="p-6 text-center text-gray-500">
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

export default RoleUpdateForm;