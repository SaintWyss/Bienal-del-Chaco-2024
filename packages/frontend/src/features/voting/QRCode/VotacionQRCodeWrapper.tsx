/**
 * Class: VotacionQRCodeWrapper
 * Description: Wrapper component for VotacionQRCode.
 * Responsibilities:
 *   - Render the VotacionQRCode component.
 * Collaborators:
 *   - VotacionQRCode: The actual QR code generation component.
 */
import React from 'react';
import VotacionQRCode from './VotacionQRCode.tsx';

const VotacionQRCodeWrapper: React.FC = () => {
    return <VotacionQRCode />;
};

export default VotacionQRCodeWrapper;
