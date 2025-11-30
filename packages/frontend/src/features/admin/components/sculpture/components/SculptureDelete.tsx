import React, { useEffect, useState } from 'react';
import { getEsculturas, deleteEscultura } from '../../../../../services/SculptureService.ts';

const SculptureDelete: React.FC = () => {
    const [esculturas, setEsculturas] = useState<any[]>([]);

    const fetchEsculturas = async () => {
        const data = await getEsculturas();
        setEsculturas(data.esculturas);
    };

    useEffect(() => {
        fetchEsculturas();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteEscultura(id);
            alert('Escultura eliminada con éxito');
            fetchEsculturas(); // Recargar la lista de esculturas después de eliminar una
        } catch (error) {
            console.error('Error al eliminar la escultura:', error);
        }
    };

    return (
        <div className="pb-12"> {/* Añadido padding al final de la página */}
            <h2 className="text-xl font-bold mb-4">Eliminar Esculturas</h2>

            {/* Contenedor con barra de desplazamiento vertical */}
            <div className="overflow-y-auto max-h-[400px]">
                {esculturas.map((escultura) => (
                    <div
                        key={escultura.id}
                        className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded"
                    >
                        <span>{escultura.nombre}</span>
                        <button
                            onClick={() => handleDelete(escultura.id)}
                            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default SculptureDelete;