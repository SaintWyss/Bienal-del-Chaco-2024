/**
 * Module: VotingService
 * Responsibilities:
 * - Handle voting-related API operations.
 * Collaborators:
 * - AxiosConfig
 */
import api from './axiosConfig';

export const registerVote = async (
    esculturaId: string,
    puntuacion: number,
    qrCode: any,
) => {
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Authentication token not found');

    try {
        const { data } = await api.post(
            `/votos/${esculturaId}`,
            { puntuacion, qrCode },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return data;
    } catch (error) {
        throw new Error('Error registering vote');
    }
};
