import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEsculturaporId } from '../../services/SculptureService.ts';
import { registerVote } from '../../services/VotingService.ts';
import { ValidarQr } from '../../services/QrService.ts';

interface Escultura {
    imagenFinal: string;
    plano: string;
    imagenes: string[];
    escultor: { usuario: { nombre: string } };
    id: string;
    nombre: string;
    descripcion: string;
    puntuacion: number;
}

const VotingPage: React.FC = () => {
    const { QrCode, esculturaId } = useParams<{ QrCode: string; esculturaId: string }>();

    const [escultura, setEscultura] = useState<Escultura | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [puntuacionSeleccionada, setPuntuacionSeleccionada] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchEscultura = async () => {
            try {
                await ValidarQr(QrCode);
                const data = await getEsculturaporId(esculturaId);
                setEscultura(data.escultura);
                setSelectedImage(data.escultura.imagenes[0]);
            } catch (err) {
                setError('El QR es inválido o ha expirado.');
            } finally {
                setLoading(false);
            }
        };

        if (esculturaId) fetchEscultura();
    }, [esculturaId, QrCode]);

    const manejarVoto = async (puntaje: number) => {
        if (escultura) {
            try {
                await registerVote(escultura.id, puntaje, QrCode);
                setPuntuacionSeleccionada(puntaje);
            } catch {
                setError('No se pudo registrar tu voto. Intenta nuevamente.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400 text-gray-800">
                <p className="text-lg font-medium">Cargando información de la escultura...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400 text-gray-800">
                <p className="text-lg font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400 text-gray-900 p-4">
            {escultura ? (
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-center mb-4">{escultura.nombre}</h1>
                    <p className="text-center text-gray-700 mb-6">{escultura.descripcion}</p>
                    <p className="text-center text-gray-800">
                        <strong>Autor:</strong> {escultura.escultor.usuario.nombre}
                    </p>

                    {/* Plano de la escultura */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-center mb-4">Plano de la Escultura</h2>
                        <div className="flex justify-center">
                            <img
                                src={escultura.plano}
                                alt={`Plano de ${escultura.nombre}`}
                                className="w-full max-w-lg rounded-lg shadow-lg"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4 text-center">Vista previa</h2>
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt={`Escultura: ${escultura.nombre}`}
                                className="w-full h-auto rounded-lg shadow-lg mb-4"
                            />
                        )}
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {escultura.imagenes.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Image ${index + 1}`}
                                    className={`h-24 w-36 object-cover rounded-lg cursor-pointer ${
                                        selectedImage === url ? 'border-4 border-blue-500' : ''
                                    }`}
                                    onClick={() => setSelectedImage(url)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-center mb-4">Imagen final</h2>
                        <img
                            src={escultura.imagenFinal}
                            alt="Imagen final"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="mt-8 text-center">
                        <h2 className="text-2xl font-bold mb-2">Puntuación</h2>
                        <p className="text-gray-700 mb-4">Puntuación actual: {escultura.puntuacion}</p>
                        <div className="flex justify-center space-x-2">
                            {[1, 2, 3, 4, 5].map((valor) => (
                                <button
                                    key={valor}
                                    onClick={() => manejarVoto(valor)}
                                    className={`text-4xl transition-transform transform ${
                                        puntuacionSeleccionada && puntuacionSeleccionada >= valor
                                            ? 'text-yellow-500 scale-125'
                                            : 'text-gray-400 hover:text-yellow-400 hover:scale-110'
                                    }`}
                                    aria-label={`Votar con ${valor} estrellas`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        {puntuacionSeleccionada !== null && (
                            <p className="mt-4 text-lg">
                                Has votado con{' '}
                                <span className="font-bold">{puntuacionSeleccionada}</span>{' '}
                                estrella{puntuacionSeleccionada > 1 ? 's' : ''}.
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-lg font-medium">No se encontró la escultura.</p>
            )}
        </div>
    );
};

export default VotingPage;
