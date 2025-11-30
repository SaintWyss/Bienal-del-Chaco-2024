# **API y Servicios del Proyecto**

Este documento describe la configuración de la API con Axios y su integración con los servicios en el proyecto.

## **Configuración de Axios**

El archivo `axiosConfig.ts` configura una instancia de Axios que sirve como puente entre el cliente y la API del backend. Incluye interceptores para manejar solicitudes y respuestas de forma eficiente.


# Descripción del Código

- **BaseURL Dinámica**:
La URL base (baseURL) se toma del entorno (VITE_API_URL) o utiliza un valor predeterminado (http://localhost:3000/api) para facilitar el desarrollo y la producción.
- **Interceptor de Solicitudes**: 
Se verifica si hay un token almacenado en localStorage.
Si existe, se añade un encabezado Authorization con el token en formato Bearer para autenticar la solicitud.

- **Interceptor de Respuestas**:
Procesa respuestas exitosas devolviéndolas directamente.
Maneja errores, permitiendo que se capturen en los controladores correspondientes.

# Servicios Utilizados
El proyecto incluye varios servicios que interactúan con esta configuración de Axios para realizar operaciones específicas. A continuación, se detallan los principales servicios:

- **AuthService.ts**: Administra la autenticación de usuarios. Permite recuperar información del usuario autenticado.
- **EventService.ts**: Proporciona funcionalidades para gestionar eventos en el proyecto. Contiene mejoras en la organización del Home.
- **ImagenService.ts**: Permite cargar imágenes desde el dispositivo del usuario. Proporciona soporte para trabajar con imágenes en la aplicación.
- **QrService.ts**: Gestión de códigos QR. Funciona de manera óptima para generar y procesar QR relacionados con esculturas y votaciones.
- **SculptureService.ts**: Administra las esculturas del proyecto. Incluye operaciones para borrado y gestión de nodos asociados.
- **VotingService.ts**: Soporte para el sistema de votación en línea. Permite crear nuevos votos para las esculturas.
- **escultorService.ts**: Herramientas relacionadas con la gestión de escultores en el backend y frontend.
- **tokenService.ts**: Administra el manejo del token en el proyecto. Incluye mejoras y comentarios para mayor claridad.
- **userService.ts**: Maneja la interacción con los usuarios del sistema. Facilita la gestión de datos del usuario.

# Resumen 
La configuración de Axios en axiosConfig.ts y los servicios asociados son fundamentales para la integración del frontend con el backend del proyecto. Cada servicio utiliza la instancia de Axios configurada para realizar solicitudes de forma segura y eficiente.
