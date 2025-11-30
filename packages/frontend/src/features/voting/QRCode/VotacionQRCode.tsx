/**
 * Class: VotacionQRCode
 * Description: Component that generates and displays a QR code for voting on a sculptor's sculpture.
 * Responsibilities:
 *   - Fetch the logged-in sculptor's sculpture.
 *   - Generate a QR code for the sculpture.
 *   - Refresh the QR code periodically.
 * Collaborators:
 *   - QrService: Generates the QR code.
 *   - AuthService: Gets the current user.
 *   - SculptureService: Fetches sculptures for the user.
 *   - ReactQR: Renders the QR code.
 */
import React, { useEffect, useState } from 'react';
import { GenerarQr } from '../../../services/QrService.ts';
import ReactQR from 'react-qr-code';
import { getUser } from "../../../services/AuthService.ts";
import { getEsculturas } from "../../../services/SculptureService.ts";

const VotacionQRCode: React.FC = () => {
    const [qrCode, setQrCode] = useState<string>('');
    const [esculturaId, setEsculturaId] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchQr = async () => {
            try {
                const user = await getUser();

                // Fetch sculptures for the user
                const esculturas = await getEsculturas(user.id);

                if (esculturas.esculturas.length === 0) {
                    setError('No tiene una escultura asignada.');
                } else {
                    setEsculturaId(String(esculturas.esculturas[0].id));
                    const qrData = await GenerarQr(esculturas.esculturas[0].id);
                    setQrCode(qrData);
                }
            } catch (err) {
                setError('Error al obtener la escultura o generar el QR.');
            }
        };

        // Initial call
        fetchQr();

        // Refresh QR every minute
        const intervalId = setInterval(fetchQr, 60000);

        // Cleanup interval
        return () => {
            clearInterval(intervalId);
        };
    }, []);

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

