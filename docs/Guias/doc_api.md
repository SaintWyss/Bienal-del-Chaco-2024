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

El proyecto incluye varios servicios que interactúan con esta configuración de Axios para realizar operaciones específicas. Estos servicios siguen el patrón de **Service Layer** y están tipados estrictamente con TypeScript.

- **AuthService.ts**: Administra la autenticación de usuarios (Login, Registro, Logout) y la recuperación de roles.
- **EventService.ts**: Gestiona la obtención y manipulación de eventos. Refactorizado para incluir documentación CRC y manejo de errores estandarizado.
- **ImagenService.ts**: Permite cargar y gestionar imágenes, optimizando su uso en la aplicación.
- **QrService.ts**: Gestión de códigos QR para votaciones y esculturas.
- **SculptureService.ts**: Administra el CRUD de esculturas. Incluye documentación CRC y tipos estrictos para evitar `any`.
- **VotingService.ts**: Gestiona el sistema de votación, validando votos únicos por usuario/QR.
- **escultorService.ts**: Gestiona la información de los escultores (biografía, obras, redes sociales).
- **tokenService.ts**: Administra el almacenamiento seguro y la renovación de tokens JWT.
- **userService.ts**: Maneja la gestión de usuarios y roles en el panel de administración.

# Resumen

La configuración de Axios en `axiosConfig.ts` y los servicios asociados son fundamentales para la integración del frontend con el backend. Cada servicio utiliza la instancia de Axios configurada para realizar solicitudes de forma segura, eficiente y tipada.
