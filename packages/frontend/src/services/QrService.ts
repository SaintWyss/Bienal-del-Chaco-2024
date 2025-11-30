/**
 * Module: QrService
 * Responsibilities:
 * - Handle QR code generation and validation.
 * Collaborators:
 * - AxiosConfig
 */
import api from './axiosConfig.ts'

export const GenerarQr = async (esculturaId: string): Promise<void> => {
    try {
        const response = await api.post('/qr/generate', { esculturaId });
        return response.data.qrCode
    }
    catch (error) {
        throw new Error ('Error generating sculpture QR');
    }
}

export const ValidarQr = async (Qrcode: any): Promise<any> => {
    try {
        const response = await api.get(`/qr/validate/${Qrcode}`);
        return response.data
    }
    catch (error) {
        throw new Error ('Unknown error validating QR');
    }
}