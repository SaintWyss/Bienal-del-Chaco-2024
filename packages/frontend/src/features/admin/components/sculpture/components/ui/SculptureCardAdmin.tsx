import React, { useState } from 'react';

interface SculptureCardAdminProps {
    id: number;
    nombre: string;
    descripcion: string | null;
    fechaCreacion: string | null;
    plano: string | null;
    imagenFinal?: string | null;
    imagenes?: string[]; // Nuevo atributo
    onSave: (updatedSculpture: any) => void;
}

const SculptureCardAdmin: React.FC<SculptureCardAdminProps> = ({
                                                                   id,
                                                                   nombre,
                                                                   descripcion,
                                                                   fechaCreacion,
                                                                   plano,
                                                                   imagenFinal,
                                                                   imagenes = [], // Valor predeterminado
                                                                   onSave,
                                                               }) => {
    const [editing, setEditing] = useState(false);
    const [editedSculpture, setEditedSculpture] = useState({
        id,
        nombre,
        descripcion,
        fechaCreacion,
        plano,
        imagenFinal,
        imagenes, // Inicialización
    });
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [newMediaType, setNewMediaType] = useState<string>('imagenFinal'); // Tipo de medio a añadir, por defecto 'imagenFinal'
    const [newMediaURL, setNewMediaURL] = useState<string>(''); // Para añadir nuevas imágenes/planos/finales

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedSculpture((prev) => ({ ...prev, [name]: value || null }));
    };

    const handleAddMedia = () => {
        if (newMediaURL.trim()) {
            if (newMediaType === 'image') {
                setEditedSculpture((prev) => ({
                    ...prev,
                    imagenes: [...prev.imagenes, newMediaURL],
                }));
            } else if (newMediaType === 'plano') {
                setEditedSculpture((prev) => ({ ...prev, plano: newMediaURL }));
            } else if (newMediaType === 'imagenFinal') {
                setEditedSculpture((prev) => ({ ...prev, imagenFinal: newMediaURL }));
            }
            setNewMediaURL('');
        }
    };

    const handleRemoveImage = (index: number) => {
        setEditedSculpture((prev) => ({
            ...prev,
            imagenes: prev.imagenes.filter((_, i) => i !== index),
        }));
    };

    const handleRemoveImagenF = () => {
        setEditedSculpture((prev) => ({
            ...prev,
            plano: null,
        }));
    };
    const handleRemovePlano = () => {
        setEditedSculpture((prev) => ({
            ...prev,
            imagenFinal: null,
        }));
    };

    const handleSave = () => {
        onSave(editedSculpture);
        setEditing(false);
    };

    return (
        <div className="border p-6 rounded-lg shadow-lg bg-white flex flex-col justify-between max-w-md mx-auto sculpture-container">
            {editing ? (
                <div>
                    <input
                        name="nombre"
                        value={editedSculpture.nombre}
                        onChange={handleInputChange}
                        className="border p-2 mb-2 w-full rounded"
                        placeholder="Nombre"
                    />
                    <textarea
                        name="descripcion"
                        value={editedSculpture.descripcion || ''}
                        onChange={handleInputChange}
                        className="border p-2 mb-2 w-full rounded"
                        placeholder="Descripción"
                    />
                    <input
                        name="fechaCreacion"
                        type="date"
                        value={editedSculpture.fechaCreacion || ''}
                        onChange={handleInputChange}
                        className="border p-2 mb-2 w-full rounded"
                    />

                    {/* Campo para añadir nuevo medio */}
                    <div className="mb-4">
                        <label className="block mb-2">Añadir una nueva imagen</label>
                        <select
                            value={newMediaType}
                            onChange={(e) => setNewMediaType(e.target.value)}
                            className="border p-2 mb-2 w-full rounded"
                        >
                            <option value="image">Imagen adicional</option>
                            <option value="plano">Plano</option>
                            <option value="imagenFinal">Imagen final</option>
                        </select>
                        <input
                            type="text"
                            value={newMediaURL}
                            onChange={(e) => setNewMediaURL(e.target.value)}
                            className="border p-2 mb-2 w-full rounded"
                            placeholder="URL del nuevo medio"
                        />
                        <button
                            onClick={handleAddMedia}
                            className="bg-green-500 text-white px-4 py-2 rounded w-full mb-2"
                        >
                            Añadir
                        </button>
                    </div>

                    {/* Imágen de plano */}
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">Plano:</h4>
                        {editedSculpture.plano ? (
                            <ul>
                                <span className="text-sm text-gray-600 truncate">{editedSculpture.plano}</span>
                                <button
                                    onClick={() => handleRemovePlano()}
                                    className="text-red-500 text-sm"
                                >
                                    Eliminar
                                </button>
                            </ul>
                        ) : (
                            <span className="text-sm text-gray-600 italic">No tiene plano </span>
                        )}
                    </div>

                    {/* Imágenes adicionales */}
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">Imágenes adicionales:</h4>
                        {editedSculpture.imagenes.length > 0 ? (
                            <ul>
                                {editedSculpture.imagenes.map((img, index) => (
                                    <li key={index} className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600 truncate">{img}</span>
                                        <button
                                            onClick={() => handleRemoveImage(index)}
                                            className="text-red-500 text-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span className="text-sm text-gray-600 italic">No hay imágenes adicionales</span>
                        )}
                    </div>
                    {/* Imágen final */}
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">Imagen Final:</h4>
                        {editedSculpture.imagenFinal ? (
                            <ul>
                                <span className="text-sm text-gray-600 truncate">{editedSculpture.imagenFinal}</span>
                                <button
                                    onClick={() => handleRemoveImagenF()}
                                    className="text-red-500 text-sm"
                                >
                                    Eliminar
                                </button>
                            </ul>
                        ) : (
                            <span className="text-sm text-gray-600 italic">No tiene imagen final </span>
                        )}
                    </div>

                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
                    >
                        Guardar
                    </button>
                    <button
                        onClick={() => setEditing(false)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
                    >
                        Cerrar
                    </button>
                </div>
            ) : (
                <div>
                    <h3 className="text-xl font-bold mb-3 text-center">{nombre}</h3>
                    {imagenFinal ? (
                        <img
                            src={imagenFinal}
                            alt={nombre}
                            className="w-full h-64 object-cover mb-4 rounded"
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 mb-4 rounded">
                            Sin imagen final
                        </div>
                    )}
                    <p className="text-sm mb-2">
                        {showFullDescription
                            ? descripcion || ''
                            : `${descripcion?.slice(0, 10)}...`}
                        {descripcion && descripcion.length > 100 && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="text-blue-500 underline ml-1"
                            >
                                {showFullDescription ? 'Ver menos' : 'Ver más'}
                            </button>
                        )}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">Fecha de creación: {fechaCreacion || 'N/A'}</p>

                    <button
                        onClick={() => setEditing(true)}
                        className="bg-gray-500 text-white px-4 py-2 rounded w-full"
                    >
                        Editar
                    </button>
                </div>
            )}
        </div>
    );
};

export default SculptureCardAdmin;
