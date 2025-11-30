/**
 * Class: UserManagement
 * Description: Component for managing users in the admin panel. Allows listing, updating roles, and deleting users.
 * Responsibilities:
 *   - Render the user management interface.
 *   - Handle navigation between List, Update Role, and Delete views.
 * Collaborators:
 *   - UserList: Component to list users.
 *   - RoleUpdateForm: Component to update user roles.
 *   - UserDelete: Component to delete users.
 */
import React, { useState } from "react";
import UserList from "./components/UserList";
import RoleUpdateForm from "./components/RoleUpdateForm";
import UserDelete from "./components/userDelete.tsx";

const UserManagement: React.FC = () => {
    const [selectedAction, setSelectedAction] = useState<string | null>(null);

    const renderContent = () => {
        switch (selectedAction) {
            case 'list':
                return <UserList />;
            case 'updateRole':
                return <RoleUpdateForm />;
            case 'delete':
                return <UserDelete />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-8 space-y-8">
            <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                <h2 className="text-center text-4xl font-extrabold text-gray-700">Gestión de Usuarios</h2>
                <div className="flex flex-col w-full gap-6">
                    {/* View User List Button */}
                    <button
                        onClick={() => setSelectedAction('list')}
                        className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                        ${selectedAction === 'list' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-purple-500 hover:to-blue-500'}`}
                    >
                        <span className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                            Lista Usuarios
                        </span>
                    </button>

                    {/* Update Role Button */}
                    <button
                        onClick={() => setSelectedAction('updateRole')}
                        className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                        ${selectedAction === 'updateRole' ? 'bg-gradient-to-r from-green-500 to-green-700' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-green-500 hover:to-green-700'}`}
                    >
                        <span className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                            Editar Rol
                        </span>
                    </button>

                    {/* Delete User Button */}
                    <button
                        onClick={() => setSelectedAction('delete')}
                        className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                        ${selectedAction === 'delete' ? 'bg-gradient-to-r from-red-500 to-red-700' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-red-500 hover:to-red-700'}`}
                    >
                        <span className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                            Borrar Usuarios
                        </span>
                    </button>
                </div>
            </div>
            {renderContent()}
        </div>
    );
};

export default UserManagement;
