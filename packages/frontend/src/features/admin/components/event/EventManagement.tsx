import React from 'react';
import CreateEvent from "./components/Event.create.tsx";
import DeleteEvent from "./components/EventDelete.tsx";
import EventEditAdmin from "./components/Event.edit.admin.tsx";

const EventManagement: React.FC = () => {
    const [selectedAction, setSelectedAction] = React.useState<string | null>(null);

    const renderContent = () => {
        switch (selectedAction) {
            case 'create':
                return <CreateEvent />;
            case 'list':
                return <EventEditAdmin />;
            case 'delete':
                return <DeleteEvent />;
            default:
                return null;
        }
    };
    return (
        <div className="absolute max-h-max inset-0 flex flex-col items-center min-h-screen p-8 space-y-8 ">
                <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                    <h2 className="text-center text-4xl font-extrabold text-gray-700">Gestión de Eventos</h2>
                    <div className="flex flex-col w-full gap-6"> {/* Se añadió gap-6 para más espacio entre los botones */}
                        {/* Crear Evento Button */}
                        <button
                            onClick={() => setSelectedAction('create')}
                            className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                            ${selectedAction === 'create' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-purple-500 hover:to-blue-500'}`}
                        >
                            <span className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                                Ingresar Evento
                            </span>
                            {/* Blobs de fondo */}
                            <span className="blob absolute top-0 left-0 w-24 h-16 rounded-full bg-orange-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                            <span className="blob absolute top-0 left-10 w-24 h-16 rounded-full bg-purple-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                            <span className="blob absolute top-[-1em] left-20 w-24 h-16 rounded-full bg-pink-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                            <span className="blob absolute top-8 left-24 w-24 h-16 rounded-full bg-blue-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        </button>

                        {/* Ver Lista de Eventos Button */}
                        <button
                            onClick={() => setSelectedAction('list')}
                            className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                            ${selectedAction === 'list' ? 'bg-gradient-to-r from-green-500 to-green-700' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-green-500 hover:to-green-700'}`}
                        >
                            <span className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                                Ver Lista de Eventos
                            </span>
                            {/* Blobs de fondo */}
                            <span className="blob absolute top-0 left-0 w-24 h-16 rounded-full bg-orange-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                            <span className="blob absolute top-0 left-10 w-24 h-16 rounded-full bg-purple-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                            <span className="blob absolute top-[-1em] left-20 w-24 h-16 rounded-full bg-pink-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                            <span className="blob absolute top-8 left-24 w-24 h-16 rounded-full bg-blue-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        </button>

                        {/* Eliminar Evento Button */}
                        <button
                            onClick={() => setSelectedAction('delete')}
                            className={`relative font-semibold text-white cursor-pointer border-none rounded-md w-full py-4 text-xl z-10 overflow-hidden
                            ${selectedAction === 'delete' ? 'bg-gradient-to-r from-red-500 to-red-700' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:from-red-500 hover:to-red-700'}`}
                        >
                            <span className="w-full py-4 absolute inset-0 flex items-center justify-center text-2xl z-10 backdrop-blur-lg rounded-md">
                                Eliminar Evento
                            </span>
                            {/* Blobs de fondo */}
                            <span className="blob absolute top-0 left-0 w-24 h-16 rounded-full bg-orange-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                            <span className="blob absolute top-0 left-10 w-24 h-16 rounded-full bg-purple-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                            <span className="blob absolute top-[-1em] left-20 w-24 h-16 rounded-full bg-pink-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                            <span className="blob absolute top-8 left-24 w-24 h-16 rounded-full bg-blue-500 opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                        </button>
                    </div>
                </div>

            {renderContent()}

        </div>
    );
};

export default EventManagement;