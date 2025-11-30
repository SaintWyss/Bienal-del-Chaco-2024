import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEsculturaporId } from '../../../../../services/SculptureService.ts';

interface Escultura {
    imagenFinal: any;
    plano: any;
    imagenes: Array<any>;
    escultor: any;
    id: string;
    nombre: string;
    descripcion: string;
    autor: string;
    puntuacion: number;
}

const EsculturasDetalles: React.FC = () => {
    const { esculturaId } = useParams<{ esculturaId: string }>();

    const [escultura, setEscultura] = useState<Escultura | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchEscultura = async () => {
            try {
                const data = await getEsculturaporId(esculturaId);
                setSelectedImage(data.escultura.imagenes[0]);
                setEscultura(data.escultura);
            } catch (err) {
                setError('No se pudo obtener la información de la escultura.');
            } finally {
                setLoading(false);
            }
        };

        if (esculturaId) {
            fetchEscultura();
        }
    }, [esculturaId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-black">
                <p className="text-lg font-medium">Cargando información de la escultura...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-black">
                <p className="text-lg font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-white p-6">
            {escultura ? (
                <div className="w-full max-w-6xl bg-white text-gray-800 bg-gradient-to-r from-gray-100 via-indigo-100 to-rose-100 rounded-lg shadow-lg p-8">
                    {/* Título principal */}
                    <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900">{escultura.nombre}</h1>
                    <p className="text-center text-gray-600 mb-8">{escultura.descripcion}</p>

                    {/* Autor */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Información del autor</h2>
                        <p className="text-lg text-gray-700">
                            <strong>Escultor:</strong> {escultura.escultor.usuario.nombre}
                        </p>
                    </div>

                    {/* Imagen seleccionada */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Vista previa de la escultura</h2>
                        <div className="flex justify-center">
                            <img
                                className="max-w-full h-auto rounded-lg shadow-lg"
                                src={selectedImage || escultura.plano}
                                alt={`Escultura: ${escultura.nombre}`}
                            />
                        </div>
                    </div>

                    {/* Galería de imágenes */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Galería de imágenes</h2>
                        <div className="flex gap-4 overflow-x-auto">
                            {escultura.imagenes.map((url, index) => (
                                <div
                                    key={index}
                                    className={`flex-shrink-0 border-2 rounded-lg cursor-pointer p-1 ${
                                        selectedImage === url ? 'border-indigo-500' : 'border-gray-300'
                                    }`}
                                    onClick={() => setSelectedImage(url)}
                                >
                                    <img
                                        className="w-40 h-24 object-cover rounded-lg"
                                        src={url}
                                        alt={`Vista ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Plano */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Plano de la escultura</h2>
                        <div className="flex justify-center">
                            <img
                                className="max-w-full h-auto rounded-lg shadow-lg"
                                src={escultura.plano}
                                alt={`Plano de la escultura: ${escultura.nombre}`}
                            />
                        </div>
                    </div>

                    {/* Imagen final */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Imagen final de la escultura</h2>
                        <div className="flex justify-center">
                            <img
                                className="max-w-full h-auto rounded-lg shadow-lg"
                                src={escultura.imagenFinal}
                                alt={`Imagen final: ${escultura.nombre}`}
                            />
                        </div>
                    </div>

                    {/* Puntuación */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">Puntuación</h2>
                        <p className="text-lg text-gray-700">
                            <strong>Puntuación actual:</strong> {escultura.puntuacion} / 5
                        </p>
                    </div>
                </div>
            ) : (
                <p className="text-lg font-medium">No se encontró la escultura.</p>
            )}
        </div>
    );
};

export default EsculturasDetalles;
