import React, { useState } from 'react';

interface SculptureCardAdminProps {
    id: number;
    nombre: string;
    descripcion: string | null;
    fechaCreacion: string | null;
    plano: string | null;
    imagenFinal?: string | null;
    onSave: (updatedSculpture: any) => void;
}

const SculptureCardAdmin: React.FC<SculptureCardAdminProps> = ({
                                                                   id,
                                                                   nombre,
                                                                   descripcion,
                                                                   fechaCreacion,
                                                                   plano,
                                                                   imagenFinal,
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
    });
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Nuevos estados para manejar el tipo de entrada de imagen (URL o archivo)
    const [imageInputType, setImageInputType] = useState<'url' | 'file'>('url'); // Controla si es URL o archivo
    const [imageFile, setImageFile] = useState<File | null>(null); // Para manejar el archivo de imagen
    const [imageURL, setImageURL] = useState<string>(''); // Para manejar la URL de la imagen

    // Nuevos estados para manejar el tipo de entrada del plano (URL o archivo)
    const [planInputType, setPlanInputType] = useState<'url' | 'file'>('url'); // Controla si es URL o archivo
    const [planFile, setPlanFile] = useState<File | null>(null); // Para manejar el archivo del plano
    const [planURL, setPlanURL] = useState<string>(''); // Para manejar la URL del plano

    // Validación de imagen (solo acepta imágenes)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            if (file.type.startsWith('image/')) {
                setImageFile(file);
                setImageURL(''); // Limpiar la URL si se elige un archivo
            } else {
                alert('Por favor, selecciona un archivo de imagen.');
                setImageFile(null); // Limpiar el archivo si no es una imagen
            }
        }
    };

    // Validación de URL de imagen (solo acepta URLs de imágenes válidas)
    const handleImageURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setImageURL(url);
        setImageFile(null); // Limpiar el archivo si se ingresa una URL
    };

    // Validación de plano (solo acepta imágenes o documentos)
    const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setPlanFile(file);
            setPlanURL(''); // Limpiar la URL si se elige un archivo
        }
    };

    // Validación de URL del plano (acepta URLs de archivos o imágenes)
    const handlePlanURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setPlanURL(url);
        setPlanFile(null); // Limpiar el archivo si se ingresa una URL
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedSculpture((prev) => ({ ...prev, [name]: value || null }));
    };

    const handleSave = () => {
        // Si el tipo de entrada es un archivo, usamos la imagen como archivo (deberías cargarla en un servidor)
        const finalImageURL = imageFile ? URL.createObjectURL(imageFile) : imageURL;
        const finalPlanURL = planFile ? URL.createObjectURL(planFile) : planURL;
        onSave({ ...editedSculpture, imagenFinal: finalImageURL, plano: finalPlanURL });
        setEditing(false);
    };

    return (
        <div className="border p-6 rounded-lg shadow-lg bg-white flex flex-col justify-between max-w-md mx-auto">
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

                    {/* Plano: Opción de elegir entre cargar un plano desde archivo o URL */}
                    <div className="mb-4">
                        <label className="block mb-2">Seleccionar plano</label>
                        <select
                            value={planInputType}
                            onChange={(e) => setPlanInputType(e.target.value as 'url' | 'file')}
                            className="border p-2 w-full rounded"
                        >
                            <option value="url">URL del plano</option>
                            <option value="file">Subir plano desde archivo</option>
                        </select>
                    </div>

                    {/* Mostrar el campo adecuado según la opción seleccionada para el plano */}
                    {planInputType === 'url' ? (
                        <input
                            name="plano"
                            value={planURL}
                            onChange={handlePlanURLChange}
                            className="border p-2 mb-2 w-full rounded"
                            placeholder="URL del plano"
                        />
                    ) : (
                        <input
                            type="file"
                            onChange={handlePlanChange}
                            className="border p-2 mb-2 w-full rounded"
                        />
                    )}
                    {planFile && planInputType !== 'url' && planFile.type.startsWith('image') && (
                        <div className="mt-2">
                            <img
                                src={URL.createObjectURL(planFile)}
                                alt="Vista previa"
                                className="w-24 h-24 object-cover"
                            />
                        </div>
                    )}
                    {/* Opción para elegir entre cargar una imagen desde archivo o URL */}
                    <div className="mb-4">
                        <label className="block mb-2">Seleccionar imagen</label>
                        <select
                            value={imageInputType}
                            onChange={(e) => setImageInputType(e.target.value as 'url' | 'file')}
                            className="border p-2 w-full rounded"
                        >
                            <option value="url">URL de imagen</option>
                            <option value="file">Subir imagen desde archivo</option>
                        </select>
                    </div>

                    {/* Mostrar el campo adecuado según la opción seleccionada para la imagen */}
                    {imageInputType === 'url' ? (
                        <input
                            name="imagenFinal"
                            value={imageURL}
                            onChange={handleImageURLChange}
                            className="border p-2 mb-2 w-full rounded"
                            placeholder="URL de la imagenFinal"
                        />
                    ) : (
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="border p-2 mb-2 w-full rounded"
                        />
                    )}

                    {/* Vista previa de la imagen seleccionada */}
                    {imageFile && imageInputType !== 'url' && imageFile.type.startsWith('image') && (
                        <div className="mt-2">
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt="Vista previa"
                                className="w-24 h-24 object-cover"
                            />
                        </div>
                    )}

                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
                    >
                        Guardar
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
                            Sin imagenFinal
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