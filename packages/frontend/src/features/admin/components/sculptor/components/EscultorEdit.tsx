import React, { useEffect, useState } from "react";
import { fetchEscultoresConNombre, fetchEscultorById, updateEscultor } from "../../../../../services/escultorService.ts";

const EscultorEdit: React.FC = () => {
    const [escultores, setEscultores] = useState<any[]>([]);
    const [selectedEscultor, setSelectedEscultor] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({
        userId: 0,
        biografia: "",
        imagen: "",
        instagram: "",
        facebook: "",
        youtube: "",
        linkedin: "",
    });

    // Fetch escultores al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEscultoresConNombre();
                setEscultores(data);
            } catch (err) {
                setError("Error al cargar los escultores");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Seleccionar un escultor y mostrar los datos para editar
    const handleSelectEscultor = async (userId: number) => {
        try {
            setLoading(true);
            const data = await fetchEscultorById(userId);
            setSelectedEscultor(data);
            setFormData(data); // Rellenar el formulario con los datos existentes
        } catch (err) {
            setError("Error al cargar la información del escultor");
        } finally {
            setLoading(false);
        }
    };

    // Función para manejar la selección de datos en el formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Enviar datos actualizados al backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateEscultor(formData); // Solo pasa los campos actualizados
            alert("Escultor actualizado con éxito");
        } catch (err) {
            setError("Error al actualizar el escultor");
        }
    };

    // Función para volver a la lista de escultores
    const handleGoBack = () => {
        setSelectedEscultor(null);  // Resetea la selección y vuelve a mostrar la lista
    };

    if (loading) return <p className="text-center text-lg text-gray-600">Cargando datos...</p>;
    if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

    return (
        <div
            className="w-full p-4 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-lg shadow-lg overflow-y-auto max-h-[400px]">
            <h3 className="text-4xl font-semibold text-center text-gray-800 mb-8">Editar Escultor</h3>

            {/* Si no se ha seleccionado un escultor, mostrar la lista */}
            <div className="w-full px-4 sm:px-6 lg:px-8">
                {!selectedEscultor && (
                    <div className="mb-6 max-w-4xl mx-auto">
                        <h4 className="text-2xl font-semibold text-gray-700">Seleccionar Escultor</h4>
                        <ul className="space-y-4">
                            {escultores.map((escultor) => (
                                <li key={escultor.userId} className="py-2">
                                    <div className="flex items-center">
                                        <img
                                            src={escultor.imagen }
                                            alt={escultor.biografia }
                                            className="w-14 h-14 object-cover rounded-full"
                                        />
                                        <button
                                            onClick={() => handleSelectEscultor(escultor.userId)}
                                            className="text-left text-lg text-blue-500 hover:text-blue-700 font-medium transition-all duration-300 ml-4">
                                            {escultor['usuario.nombre']}
                                        </button>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Mostrar el formulario solo si se ha seleccionado un escultor */}
            {selectedEscultor && (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <label htmlFor="biografia" className="block text-xl font-medium text-gray-700">Biografía</label>
                        <textarea
                            id="biografia"
                            name="biografia"
                            value={formData.biografia || ""}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="imagen" className="block text-xl font-medium text-gray-700">Imagen URL</label>
                        <input
                            type="text"
                            id="imagen"
                            name="imagen"
                            value={formData.imagen || ""}
                            onChange={handleInputChange}
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label htmlFor="instagram"
                                   className="block text-xl font-medium text-gray-700">Instagram</label>
                            <input
                                type="text"
                                id="instagram"
                                name="instagram"
                                value={formData.instagram || ""}
                                onChange={handleInputChange}
                                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="facebook"
                                   className="block text-xl font-medium text-gray-700">Facebook</label>
                            <input
                                type="text"
                                id="facebook"
                                name="facebook"
                                value={formData.facebook || ""}
                                onChange={handleInputChange}
                                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="youtube" className="block text-xl font-medium text-gray-700">YouTube</label>
                            <input
                                type="text"
                                id="youtube"
                                name="youtube"
                                value={formData.youtube || ""}
                                onChange={handleInputChange}
                                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="linkedin"
                                   className="block text-xl font-medium text-gray-700">LinkedIn</label>
                            <input
                                type="text"
                                id="linkedin"
                                name="linkedin"
                                value={formData.linkedin || ""}
                                onChange={handleInputChange}
                                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleGoBack}
                            className="w-full py-4 text-2xl text-white bg-gray-500 hover:bg-gray-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                            Volver
                        </button>
                        <button
                            type="submit"
                            className="w-full py-4 text-2xl text-white bg-green-500 hover:bg-green-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                            Actualizar Escultor
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EscultorEdit;