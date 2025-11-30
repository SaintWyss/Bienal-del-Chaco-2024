import React, { useState, useEffect } from 'react';
import SculptureCardAdmin from './ui/SculptureCardAdmin.tsx';
import { getEsculturas, updateEscultura } from '../../../../../services/SculptureService.ts';

interface Escultura {
    id: number;
    descripcion: string;
    nombre: string;
    fechaCreacion: string ;
    plano: string;
    imagenFinal?: string;
}

const SculptureListAdmin: React.FC = () => {

    const [esculturas, setEsculturas] = useState<Escultura[]>([]);

    // Obtener las esculturas al montar el componente
    useEffect(() => {
        const fetchSculptures = async () => {
            try {
                const data = await getEsculturas();  // Aquí obtenemos las esculturas
                console.log('Datos recibidos:', data);  // Verifica la estructura de los datos
                if (data && Array.isArray(data.esculturas)) {
                    setEsculturas(data.esculturas);  // Asignamos el array de esculturas
                } else {
                    console.error('La respuesta no contiene un array válido en "esculturas".');
                    setEsculturas([]);  // Si no es un array válido, establecemos el estado vacío
                }
            } catch (error) {
                console.error('Error al cargar las esculturas:', error);
                setEsculturas([]);  // En caso de error, aseguramos que el estado esté vacío
            }
        };


        fetchSculptures();
    }, []); // Solo se ejecuta una vez al montar el componente

    const handleSaveSculpture = async (updatedSculpture: any) => {
        try {
            await updateEscultura(updatedSculpture.id, updatedSculpture);
            setEsculturas((prevSculptures) =>
                prevSculptures.map((sculpture) =>
                    sculpture.id === updatedSculpture.id ? updatedSculpture : sculpture
                )
            );
        } catch (error) {
            console.error('Error al actualizar la escultura:', error);
        }
    };

    return (
        <div className="px-8 py-6 pb-12"> {/* Añadido padding-bottom al contenedor */}
            <h2 className="text-2xl font-bold text-center mb-8">Lista de Esculturas</h2>
            <div
                className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto max-h-96">
                {esculturas.length > 0 ? (
                    esculturas.map((escultura) => (
                        <SculptureCardAdmin
                            key={escultura.id}
                            id={escultura.id}
                            nombre={escultura.nombre}
                            descripcion={escultura.descripcion}
                            plano={escultura.plano}
                            fechaCreacion={escultura.fechaCreacion}
                            imagenFinal={escultura.imagenFinal}
                            onSave={handleSaveSculpture}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No hay esculturas disponibles
                    </p>
                )}
            </div>
        </div>

    );
};

export default SculptureListAdmin;
