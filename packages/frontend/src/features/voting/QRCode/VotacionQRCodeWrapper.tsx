import React from 'react';

import VotacionQRCode from './VotacionQRCode.tsx'; // Asegúrate de ajustar esta ruta si es necesario

// Componente envoltorio que extrae `eventoId` de la URL y lo pasa a `VotacionQRCode`
const VotacionQRCodeWrapper: React.FC = () => {

    return <VotacionQRCode />; // Pasa `eventoId` como prop a `VotacionQRCode`
};

export default VotacionQRCodeWrapper;
