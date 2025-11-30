import api from './axiosConfig';

/**
 * Función para registrar un voto en una escultura.
 *
 * @param esculturaId - ID de la escultura a la que se le da el voto.
 * @param voto - El valor del voto (como string, por ejemplo: "like", "dislike").
 * @returns La respuesta de la API con los datos del voto registrado.
 * @throws Error si no se encuentra el token de autenticación o si la solicitud falla.
 */
export const registerVote = async (
    esculturaId: string,  // Cambié el tipo a string ya que el backend usa un ID en string
    puntuacion: number,  // Se cambia el tipo de 'voto' a número, ya que el backend espera un valor numérico
    qrCode: any,  // Se agrega qrCode como parámetro
) => {
    const token = localStorage.getItem('token');

    // Verificar si el token está presente en localStorage
    if (!token) throw new Error('Token de autenticación no encontrado');

    try {
        // Realizar la solicitud POST para registrar el voto
        const { data } = await api.post(
            `/votos/${esculturaId}`,  // El endpoint ahora solo necesita esculturaId
            { puntuacion, qrCode },  // Pasamos puntuación y qrCode en el cuerpo
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return data;
    } catch (error) {
        // Error mínimo sin detalles adicionales
        throw new Error('Error al registrar el voto');
    }
};
