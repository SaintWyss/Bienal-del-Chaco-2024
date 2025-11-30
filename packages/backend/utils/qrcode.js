/**
 * Module: QrCodeUtils
 * Responsibilities:
 * - Generate QR code images.
 * Collaborators:
 * - qrcode
 */
const QRCode = require('qrcode');

const generateQRCode = async (text) => {
    try {
        return await QRCode.toDataURL(text);
    } catch (error) {
        throw new Error("Error generating QR code");
    }
};

module.exports = {
    generateQRCode,
};