import React, { useEffect, useState } from 'react';
import { GenerarQr } from '../../../services/QrService.ts';
import ReactQR from 'react-qr-code';
import { getUser } from "../../../services/AuthService.ts";
import { getEsculturas } from "../../../services/SculptureService.ts";

const VotacionQRCode: React.FC = () => {
    const [qrCode, setQrCode] = useState<any>('');  // Estado para almacenar el código QR
    const [esculturaId, setEsculturaId] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string>(''); // Para manejar el error si no hay escultura

    useEffect(() => {
        const fetchQr = async () => {
            try {
                const user = await getUser();
                console.log('User', user.id);

                // Obtener las esculturas para el usuario
                const esculturas = await getEsculturas(user.id);
                console.log('Esculturas:', esculturas);

                if (esculturas.esculturas.length === 0) {
                    setError('No tiene una escultura');
                } else {
                    console.log('Esto es:', esculturas.esculturas[0].id);
                    setEsculturaId(String(esculturas.esculturas[0].id)); // Establecer el ID de la escultura
                    const qrData = await GenerarQr(esculturas.esculturas[0].id);
                    console.log('Info que mando', qrData);
                    setQrCode(qrData); // Establecer el código QR
                }
            } catch (err) {
                console.log('Error al generar el QR. Inténtalo nuevamente.');
                setError('Error al obtener la escultura o generar el QR.');
            }
        };

        // Llamada inicial
        fetchQr();

        // Configurar el intervalo para recargar el QR cada 1 minuto
        const intervalId = setInterval(fetchQr, 60000); // 60000ms = 1 minuto

        // Limpiar el intervalo cuando el componente se desmonte
        return () => {
            clearInterval(intervalId);
        };
    }, []);  // Dependencia vacía: solo se ejecuta una vez cuando se monta el componente

    // Si hay un error o no hay escultura, mostrar mensaje de error
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-black">
                <p className="text-lg font-bold">{error}</p>
            </div>
        );
    }

    if (!qrCode) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-black">
                <p className="text-lg font-bold">Cargando QR...</p>
            </div>
        );
    }

    const baseURL = `${window.location.origin}/votacion-escultura/${qrCode}/${esculturaId}`;

    return (
        <div className="flex flex-col items-center justify-center h-screen text-black text-center p-4 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
            <h1 className="text-2xl md:text-4xl font-bold mb-6">¡VOTA MI ESCULTURA!</h1>
            <div className="w-[90%] h-[90%] max-w-[400px] max-h-[400px] md:max-w-[600px] md:max-h-[600px] bg-white p-2 rounded-lg shadow-lg">
                <ReactQR value={baseURL} size={256} style={{ width: "100%", height: "100%" }} />
            </div>
            <p className="mt-6 text-lg md:text-xl">
                Escanea el código QR para votar por mi escultura en este evento.
            </p>
        </div>
    );
};

export default VotacionQRCode;

