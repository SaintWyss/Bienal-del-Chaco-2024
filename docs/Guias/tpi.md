## Trabajo Práctico Final - Año 2024

### Objetivos

Que el alumno logre:

- Adquirir habilidades prácticas sobre los conocimientos impartidos en las principales tecnologías y herramientas para el desarrollo y construcción de aplicaciones informáticas actuales.

### Modalidad de Desarrollo

- **Grupal:** en grupos de entre 4 y 7 alumnos.

### Formato de Presentación

- **Individual** con coloquio en máquina e informe impreso y digital (formato .odt, .doc, .pdf).

### Fecha de Entrega

- 05/12/2024

### Contenido del Informe de Presentación

- **Formato de hoja:** A4.
- **Carátula:** Nombre de la materia, año de cursado, número de grupo, nombre completo de los integrantes. Correo electrónico de cada integrante.
- **Índice de Contenidos:** Índice temático de contenidos, organizado por lenguaje o herramientas de programación.
- **Informe Detallado:** Descripción de las decisiones de diseño y de las soluciones implementadas para cumplimentar el práctico.

### Aspectos de Evaluación

La evolución del trabajo se realizará de acuerdo a la siguiente tabla:

| Aspecto                        | Ítem                         | Condición  | Puntaje |
|--------------------------------|------------------------------|------------|---------|
| **Cumplimiento funcional de la aplicación** | Funcionalidad               | Mandatorio  | 15      |
| **Arquitectura empleada**                | Multiplataforma             | Opcional    | 10      |
|                                       | Cliente Liviano y móvil     | Mandatorio  | 10      |
| **Acceso a Datos**                     | Base de Datos               | Mandatorio  | 10      |
|                                       | ORM                          | Opcional    | 10      |
| **Lógica de Negocios**                   | Validación de Datos         | Opcional    | 5       |
|                                       | Exposición de Servicios      | Mandatorio  | 15      |
| **Presentación**                       | Usabilidad                   | Mandatorio  | 10      |
|                                       | MVC                          | Opcional    | 10      |
|                                       | Estilos                      | Opcional    | 5       |
| **Total**                            |                              |            | 100     |


### Actividad 1: Escenario

La organización de la Bienal Internacional de Escultura del Chaco se ha contactado con su empresa para planificar, analizar, desarrollar e implementar un sistema de gestión que soporte el registro de eventos, escultores y aplicaciones satélites para que los ciudadanos/público en general puedan realizar comentarios y votación durante el evento.

### Requerimientos Funcionales

- **Gestión de Eventos:** Generar eventos futuros y pasados, con la capacidad de agregar, ver, modificar y eliminar información sobre cada evento, incluyendo detalles como fecha, lugar, descripción y temática.
- **Gestión de Escultores:** Mantener la información de los escultores con la capacidad de agregar, ver, modificar y eliminar información detallada, incluyendo nombre, biografía, contacto y obras previas.
- **Gestión de Esculturas:** Agregar, ver, modificar y eliminar información sobre esculturas, incluyendo la descripción de la temática y la fecha de creación.
- **Gestión de Imágenes:** Subir y visualizar imágenes de las esculturas en diferentes etapas (antes, durante y después del evento).
- **Aplicación Web:** Crear un sitio web público para visualizar el próximo evento y los eventos anteriores, incluyendo la visualización de escultores y sus esculturas.
- **Sistema de Votación:** Permitir a los visitantes votar por sus esculturas favoritas con valores del 1 al 5, y asegurar que cada visitante pueda votar solo una vez mediante autenticación. Implementar un sistema de votación por QR que cambie cada minuto y una PWA (Aplicación Web Progresiva).

### Requerimientos No Funcionales

- **Interfaz de Usuario (UI):** Adaptable a dispositivos móviles, tablets y desktops, con compatibilidad multiplataforma y mecanismos seguros de autenticación y autorización.
- **Protección de Datos:** Asegurar que los datos estén protegidos contra accesos no autorizados.
- **Tiempo de Respuesta:** Garantizar tiempos de respuesta rápidos en la carga de vistas/páginas y procesamiento de datos.
- **Optimización de Imágenes:** Asegurar la carga rápida de fotos sin pérdida significativa de calidad.
- **Usabilidad:** Interfaz intuitiva y accesible, con integración para compartir en redes sociales y validación de votantes para evitar fraudes.

### Desarrollo

Para el desarrollo del TP, los grupos deberán definir y coordinar las APIs de los diferentes actores y publicarlas en el sitio web de la materia mediante PRs. Deberán generar un documento de Definición de APIs, haciendo un fork del repositorio del sitio web, generando la documentación y realizando un PR, como se hizo en el TP 1.