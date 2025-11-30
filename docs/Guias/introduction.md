# Introducción

El proyecto **Bienal del Chaco 2024** es un sistema integral diseñado para gestionar la **Bienal Internacional de Escultura del Chaco**, un evento de renombre que reúne artistas, obras y actividades culturales en una experiencia única. Este sistema combina un frontend moderno y un backend robusto para ofrecer un rendimiento óptimo y una experiencia de usuario eficiente.

## Características Principales

### **Frontend**
El frontend del sistema está desarrollado con tecnologías modernas para garantizar interfaces responsivas, dinámicas y personalizables:
- **React con TypeScript:** Utilizado para construir componentes reutilizables y escalables, con tipado estático que mejora la calidad del código.
- **Tailwind CSS:** Framework de diseño que facilita la creación de interfaces responsivas mediante clases utilitarias.
- **Vite:** Herramienta de construcción rápida que proporciona recarga en caliente y tiempos de inicio reducidos.
- **Framer Motion:** Implementa animaciones suaves y transiciones dinámicas.
- **GSAP:** Crea animaciones complejas y de alto rendimiento.
- **Swiper:** Permite la creación de deslizadores interactivos ideales para galerías y presentaciones.
- **React Router Dom:** Gestión eficiente de rutas para una navegación fluida entre vistas.


### **Backend**
El backend utiliza tecnologías eficientes para procesar solicitudes, gestionar datos y garantizar la seguridad:
- **Node.js:** Entorno de ejecución que permite desarrollar aplicaciones escalables.
- **Express:** Framework minimalista para manejar rutas, middleware y solicitudes HTTP.
- **Sequelize:** ORM para interactuar con bases de datos relacionales.
- **PostgreSQL:** Base de datos relacional robusta y confiable.
- **bcryptjs:** Hashing seguro para proteger las contraseñas de los usuarios.
- **jsonwebtoken (JWT):** Manejo seguro de autenticación y autorización.
- **dotenv:** Gestión de variables de entorno para proteger configuraciones sensibles.
- **node-schedule:** Programación de tareas recurrentes en el servidor.

### **Gestión y Configuración**
- **Gestión de Dependencias:** Se utiliza **Yarn** para manejar las librerías y paquetes del proyecto.
- **Control de Versiones:** Implementado con **Git** para un seguimiento eficiente del desarrollo.

### **API**
El backend expone una API RESTful para interactuar con el sistema, cuya documentación está disponible en [Documentación de API](doc_api.md).

Para más detalles, consulta [Tecnologías](../arquitectura/Tecnologias.md) .
Para más detalles sobre el TPI, consulta [Trabajo Práctico Final - Año 2024](tpi.md) .

# Relación del Proyecto con los Principios SOLID
El proyecto Bienal del Chaco 2024 aplica los principios SOLID para garantizar que el código sea escalable, mantenible y fácil de entender. A continuación, se describe cómo se implementan estos principios:

### **1. Principio de Responsabilidad Única (SRP)**
Cada componente o módulo tiene una única responsabilidad claramente definida:
- Los componentes en el frontend, como `Navbar`, manejan únicamente su propia lógica (ej., navegación) y delegan tareas como autenticación a servicios especializados.
- En el backend, los controladores (`controllers/`) manejan la lógica de las solicitudes, mientras que los servicios (`services/`) encapsulan la lógica de negocio.

### **2. Principio Abierto/Cerrado (OCP)**
El código está diseñado para ser extensible sin necesidad de modificar su estructura existente:
- Los hooks personalizados (`hooks/`) y los servicios (`services/`) permiten agregar nuevas funcionalidades sin alterar el código existente.
- Los estilos con Tailwind CSS son fáciles de extender mediante clases personalizadas.

### **3. Principio de Sustitución de Liskov (LSP)**
Los componentes y clases pueden ser reemplazados por otros de su misma jerarquía sin romper la funcionalidad:
- Ejemplo: Un botón genérico en `ui/Button` puede ser sustituido por otro componente de botón sin que esto afecte a los demás componentes que lo utilizan.

### **4. Principio de Segregación de Interfaces (ISP)**
Se evitan las interfaces monolíticas dividiendo la lógica en piezas más pequeñas y enfocadas:
- Los formularios (`Form`) no contienen lógica de validación directamente. Esta se delega a hooks o servicios especializados, manteniendo los componentes simples y fáciles de reutilizar.

### **5. Principio de Inversión de Dependencias (DIP)**
Se prioriza la abstracción sobre la implementación:
- Las páginas (componentes de alto nivel) dependen de servicios para interactuar con la API, evitando que manejen directamente la lógica de bajo nivel.
- En el backend, las dependencias como la base de datos (Sequelize) están abstraídas en servicios, permitiendo un fácil intercambio o modificación de implementaciones.

## Precondicion
Para continuar consulta [Precondiciones](precondicion.md) .
