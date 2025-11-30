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
        <div className="absolute inset-0 overflow-hidden flex flex-col items-center min-h-screen p-8 space-y-8 ">
            <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                <h2 className="text-center text-4xl font-extrabold text-gray-700">Gestión de Usuarios</h2>
                <div className="flex flex-col w-full gap-6"> {/* Se añadió gap-6 para más espacio entre los botones */}
                    {/* Ver lista de usuarios */}
                    <button
                        onClick={() => setSelectedAction('list')}
                        className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                        ${selectedAction === 'create' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-purple-500 hover:to-blue-500'}`}
                    >
                        <span
                            className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                            Lista Usuarios
                        </span>
                        {/* Blobs de fondo */}
                        <span
                            className="blob absolute top-0 left-0 w-24 h-16 rounded-full bg-orange-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        <span
                            className="blob absolute top-0 left-10 w-24 h-16 rounded-full bg-purple-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        <span
                            className="blob absolute top-[-1em] left-20 w-24 h-16 rounded-full bg-pink-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        <span
                            className="blob absolute top-8 left-24 w-24 h-16 rounded-full bg-blue-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                    </button>
                    {/* Actualizar roles */}
                    <button
                        onClick={() => setSelectedAction('updateRole')}
                        className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                        ${selectedAction === 'delete' ? 'bg-gradient-to-r from-green-500 to-green-700' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-green-500 hover:to-green-700'}`}
                    >    <span
                        className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                            Editar Rol
                        </span>
                        {/* Blobs de fondo */}
                        <span
                            className="blob absolute top-0 left-0 w-24 h-16 rounded-full bg-orange-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        <span
                            className="blob absolute top-0 left-10 w-24 h-16 rounded-full bg-purple-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        <span
                            className="blob absolute top-[-1em] left-20 w-24 h-16 rounded-full bg-pink-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        <span
                            className="blob absolute top-8 left-24 w-24 h-16 rounded-full bg-blue-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                    </button>
                    <button
                        onClick={() => setSelectedAction('delete')}
                        className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                        ${selectedAction === 'create' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-purple-500 hover:to-blue-500'}`}
                    >
                        <span
                            className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                            Borrar Usuarios
                        </span>
                        {/* Blobs de fondo */}
                        <span
                            className="blob absolute top-0 left-0 w-24 h-16 rounded-full bg-orange-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        <span
                            className="blob absolute top-0 left-10 w-24 h-16 rounded-full bg-purple-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        <span
                            className="blob absolute top-[-1em] left-20 w-24 h-16 rounded-full bg-pink-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        <span
                            className="blob absolute top-8 left-24 w-24 h-16 rounded-full bg-blue-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                    </button>
                </div>
            </div>
            {renderContent()}
        </div>
    );
};

export default UserManagement;