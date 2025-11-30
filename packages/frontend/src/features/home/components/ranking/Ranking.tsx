/**
 * Class: Ranking
 * Description: Component that displays the ranking of sculptors based on their sculpture scores.
 * Responsibilities:
 *   - Fetch sculptors and sculptures data.
 *   - Calculate total scores for each sculptor.
 *   - Display the ranking in a table format.
 * Collaborators:
 *   - escultorService: Fetches sculptor data.
 *   - SculptureService: Fetches sculpture data.
 */
import { useState, useEffect } from 'react';
import { fetchEscultoresConNombre } from '../../../../services/escultorService.ts';
import { getEsculturas } from "../../../../services/SculptureService.ts";

interface Escultor {
    userId: number;
    imagen?: string;
    usuario: { nombre: string };
    puntuacionTotal?: number;
    [key: string]: any; // Allow dynamic access for "usuario.nombre" if needed, though better to access directly
}

interface Escultura {
    userId: number;
    puntuacion: number;
}

const Ranking = () => {
    const [escultores, setEscultores] = useState<Escultor[]>([]);

    useEffect(() => {
        const loadEscultores = async () => {
            try {
                // Fetch sculptors with their names and other data
                const data = await fetchEscultoresConNombre();

                // Fetch sculptures
                const response = await getEsculturas();

                // Access the 'esculturas' property of the returned object
                const sculpturesList = response.esculturas;

                // Verify if 'sculpturesList' is an array
                if (!Array.isArray(sculpturesList)) {
                    return;
                }

                // Associate sculpture score with the sculptor
                const sculptorsWithScore = data.map((escultor: Escultor) => {
                    // Find the sculpture associated with the sculptor using the sculptor's ID
                    const sculpture = sculpturesList.find((s: Escultura) => s.userId === escultor.userId);
                    return {
                        ...escultor,
                        puntuacionTotal: sculpture ? sculpture.puntuacion : 0,
                    };
                });

                // Sort sculptors by score
                const sortedSculptors = sculptorsWithScore.sort((a: Escultor, b: Escultor) => (b.puntuacionTotal || 0) - (a.puntuacionTotal || 0));

                // Update state with sorted sculptors
                setEscultores(sortedSculptors);

            } catch (error) {
                // Handle error silently or with a UI notification
            }
        };

        loadEscultores();
    }, []);

    const getMedalIcon = (index: number) => {
        if (index === 0) return "🥇"; // Gold
        if (index === 1) return "🥈"; // Silver
        if (index === 2) return "🥉"; // Bronze
        return "";
    };

    return (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 min-h-screen flex flex-col items-center py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Ranking de Escultores</h1>
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Container for horizontal scrolling */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left">
                        <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-3 text-center">#</th>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3 text-center">Puntuación Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {escultores.map((escultor, index) => (
                            <tr
                                key={escultor.userId}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                                } hover:bg-gray-200`}
                            >
                                <td className="px-4 py-3 text-center text-lg font-semibold">
                                    <span className="text-2xl">{getMedalIcon(index)}</span>
                                </td>
                                <td className="px-4 py-3 flex items-center">
                                    <img
                                        src={escultor.imagen || "https://default-avatar.com/imagen.png"}
                                        alt="Escultor"
                                        className="w-10 h-10 rounded-full mr-4"
                                    />
                                    <span className="text-gray-800 font-medium">{escultor.usuario?.nombre || "Desconocido"}</span>
                                </td>
                                <td className="px-4 py-3 text-center text-lg font-bold text-gray-700">
                                    {escultor.puntuacionTotal}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Ranking;
