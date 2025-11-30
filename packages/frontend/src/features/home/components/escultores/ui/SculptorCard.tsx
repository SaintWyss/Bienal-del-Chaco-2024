import React, { useState } from 'react';

interface SculptorCardProps {
    id: number;
    nombre: string;
    biografia: string;
    imagen?: string;
    onSave: (updatedSculptor: any) => void;
}

const SculptorCard: React.FC<SculptorCardProps> = ({
                                                       id,
                                                       nombre,
                                                       biografia,
                                                       imagen,
                                                       onSave,
                                                   }) => {
    const [editing, setEditing] = useState(false);
    const [editedSculptor, setEditedSculptor] = useState({
        id,
        nombre,
        biografia,
        imagen,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedSculptor((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedSculptor);
        setEditing(false);
    };

    return (
        <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
            {editing ? (
                <div className="p-4">
                    <input
                        name="nombre"
                        value={editedSculptor.nombre}
                        onChange={handleInputChange}
                        className="border p-2 mb-2 w-full rounded"
                        placeholder="Nombre"
                        required
                    />
                    <textarea
                        name="biografia"
                        value={editedSculptor.biografia}
                        onChange={handleInputChange}
                        className="border p-2 mb-2 w-full rounded"
                        placeholder="Biografía"
                        required
                    />
                    <input
                        name="imagen"
                        value={editedSculptor.imagen || ''}
                        onChange={handleInputChange}
                        className="border p-2 mb-2 w-full rounded"
                        placeholder="URL de la imagen"
                    />
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Guardar
                    </button>
                </div>
            ) : (
                <div>
                    {imagen ? (
                        <img
                            src={imagen}
                            alt={nombre}
                            className="w-full h-48 object-cover"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                            Sin Imagen
                        </div>
                    )}
                    <div className="p-4">
                        <h3 className="text-lg font-bold">{nombre}</h3>
                        <p className="text-gray-600 text-sm">
                            Biografía:{' '}
                            {biografia.length > 50 ? (
                                <span>
                                    {biografia.slice(0, 50)}...
                                    <button
                                        className="text-blue-500 ml-1"
                                        onClick={() => alert(biografia)}
                                    >
                                        Ver más
                                    </button>
                                </span>
                            ) : (
                                biografia
                            )}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SculptorCard;