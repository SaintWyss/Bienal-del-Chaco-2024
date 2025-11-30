import axios from 'axios';

// Crear una instancia de Axios con baseURL configurada
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Usamos la URL base del entorno, si no está, usamos localhost
});

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Recuperamos el token del almacenamiento local
        // Si el token existe, se agrega al encabezado de autorización
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Configuramos el encabezado de autorización con el token
        }
        // Devolvemos la configuración de la solicitud para que continúe con el flujo normal
        return config;
    },
    (error) => {
        // En caso de error en la solicitud, lo manejamos aquí
        // Se captura cualquier error en el interceptor de la solicitud
        return Promise.reject(error); // Devolvemos el error para que pueda ser manejado posteriormente
    }
);

// Interceptor para manejar la respuesta
api.interceptors.response.use(
    (response) => {
        // Si la respuesta es exitosa, simplemente la devolvemos
        return response; // Aquí podemos procesar la respuesta si es necesario
    },
    (error) => {
        // Capturamos cualquier error en la respuesta de la API
        // Manejamos el error de la respuesta sin mostrar el mensaje completo para evitar exponer detalles
        return Promise.reject(error); // Devolvemos el error para que pueda ser manejado en el lugar adecuado
    }
);

export default api;
