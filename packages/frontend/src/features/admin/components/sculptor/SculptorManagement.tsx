/**
 * Class: SculptorManagement
 * Description: Component for managing sculptors in the admin panel. Allows creating, editing, and deleting sculptors.
 * Responsibilities:
 *   - Render the sculptor management interface.
 *   - Handle navigation between Create, Edit, and Delete views.
 * Collaborators:
 *   - EscultorForm: Component to create a new sculptor.
 *   - EscultorEdit: Component to edit an existing sculptor.
 *   - EscultorDelete: Component to delete a sculptor.
 */
import React from 'react';
import EscultorForm from "./components/EscultorForm.tsx";
import EscultorDelete from "./components/EscultorDelete";
import EscultorEdit from "./components/EscultorEdit.tsx";

const SculptorManagement: React.FC = () => {
    const [selectedAction, setSelectedAction] = React.useState<string | null>(null);

    const renderContent = () => {
        switch (selectedAction) {
            case 'create':
                return <EscultorForm />;
            case 'edit':
                return <EscultorEdit />;
            case 'delete':
                return <EscultorDelete />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-8 space-y-8">
            <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                <h2 className="text-center text-4xl font-extrabold text-gray-700">Gestión de Escultores</h2>
                <div className="flex flex-col w-full gap-6">
                    {/* Add Sculptor Button */}
                    <button
                        onClick={() => setSelectedAction('create')}
                        className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                        ${selectedAction === 'create' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-purple-500 hover:to-blue-500'}`}
                    >
                        <span className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                            Añadir Escultor
                        </span>
                    </button>

                    {/* Edit Sculptor Button */}
                    <button
                        onClick={() => setSelectedAction('edit')}
                        className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                        ${selectedAction === 'edit' ? 'bg-gradient-to-r from-green-500 to-green-700' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-green-500 hover:to-green-700'}`}
                    >
                        <span className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                            Editar Escultor
                        </span>
                    </button>

                    {/* Delete Sculptor Button */}
                    <button
                        onClick={() => setSelectedAction('delete')}
                        className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                        ${selectedAction === 'delete' ? 'bg-gradient-to-r from-red-500 to-red-700' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-red-500 hover:to-red-700'}`}
                    >
                        <span className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                            Eliminar Escultor
                        </span>
                    </button>
                </div>
            </div>
            {renderContent()}
        </div>
    );
};

export default SculptorManagement;
