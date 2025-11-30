import api from './axiosConfig.ts'

export const GenerarQr = async (esculturaId: string): Promise<void> => {
    try {
        const response = await api.post('/qr/generate', { esculturaId });
        return response.data.qrCode
    }
    catch (error) {
        throw new Error ('Error al crear qr de escultura');
    }
}

export const ValidarQr = async (Qrcode: any): Promise<any> => {
    try {
        console.log(Qrcode)
        const response = await api.get(`/qr/validate/${Qrcode}`);
        console.log(response.data);
        return response.data
    }
    catch (error) {
        throw new Error ('Error desconocido al validar el qr');
    }
}