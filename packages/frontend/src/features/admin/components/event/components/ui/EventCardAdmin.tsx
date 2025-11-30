import React, { useState, useEffect } from 'react';

interface EventCardAdminProps {
    id: string;
    nombre: string;
    tematica: string;
    descripcion: string;
    imagen: string;
    fechaInc: string;  // Cambiar de fechaInicio a fechaInc
    fechaFin: string;
    onSave: (updatedEvent: any) => void;
}

const EventCardAdmin: React.FC<EventCardAdminProps> = ({
                                                           id,
                                                           nombre,
                                                           tematica,
                                                           descripcion,
                                                           imagen,
                                                           fechaInc,  // Cambiar de fechaInicio a fechaInc
                                                           fechaFin,
                                                           onSave
                                                       }) => {
    const [editData, setEditData] = useState({
        nombre,
        tematica,
        descripcion,
        imagen,
        fechaInc,  // Cambiar de fechaInicio a fechaInc
        fechaFin,
    });

    // Usa useEffect para asegurarte de que los datos se actualicen al recibir nuevas props
    useEffect(() => {
        console.log('Fecha Inicio:', fechaInc);  // Verifica el valor recibido de las props
        setEditData((prev) => ({
            ...prev,
            fechaInc,
            fechaFin
        }));
    }, [fechaInc, fechaFin]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log('Campo actualizado:', name, 'Valor:', value);  // Verifica los cambios en los campos
        setEditData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave({
            ...editData,
            id
        });
    };

    return (
        <div className="border p-4 rounded-lg shadow-sm bg-gray-100">
            <div className="space-y-3">
                <input
                    type="text"
                    name="nombre"
                    value={editData.nombre}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Nombre del evento"
                />
                <input
                    type="text"
                    name="tematica"
                    value={editData.tematica}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Temática"
                />
                <textarea
                    name="descripcion"
                    value={editData.descripcion}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Descripción del evento"
                />
                <input
                    type="text"
                    name="imagen"
                    value={editData.imagen}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="URL de la imagen"
                />
                <input
                    type="datetime-local"
                    name="fechaInc"  // Cambiar de fechaInicio a fechaInc
                    value={editData.fechaInc}  // Cambiar de fechaInicio a fechaInc
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
                <input
                    type="datetime-local"
                    name="fechaFin"
                    value={editData.fechaFin}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};

export default EventCardAdmin;
