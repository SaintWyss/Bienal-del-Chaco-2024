# Arquitectura del Proyecto Bienal del Chaco 2024

## 1. Introducción

### Objetivo del Documento:

Este documento describe la arquitectura del sistema utilizado en el Proyecto Bienal del Chaco 2024, proporcionando una visión detallada de sus componentes principales y su interacción.

### Descripción General del Proyecto:

El proyecto es una plataforma interactiva para gestionar eventos y esculturas relacionadas con la Bienal del Chaco. Permite a los usuarios votar, obtener información y participar en actividades del evento.

---

## 2. Estructura General

### Descripción de la Arquitectura:

El sistema sigue una arquitectura monolítica basada en cliente-servidor. El frontend se comunica con el backend a través de una API RESTful, mientras que la base de datos se gestiona mediante Sequelize sobre PostgreSQL.

## 3. Componentes Principales

### Frontend:

- **React (TypeScript):** Construcción de interfaces con tipado estático.
- **Tailwind CSS:** Framework para diseñar interfaces de manera rápida y responsiva.
- **Vite:** Herramienta de desarrollo rápida con recarga en caliente.
- **Framer Motion y GSAP:** Librerías para animaciones avanzadas.

### Backend:

- **Node.js / Express:** Entorno de ejecución y framework para gestionar rutas y solicitudes.
- **Sequelize / PostgreSQL:** ORM para interactuar con la base de datos relacional.
- **bcryptjs / JWT:** Gestión de seguridad con hashing de contraseñas y autenticación basada en tokens.

### Base de Datos:

- **PostgreSQL:** Sistema de gestión de bases de datos relacional utilizado para almacenar datos del evento y las esculturas.

## 4. Flujo de Datos

El flujo de datos es el siguiente:

1. El usuario interactúa con el frontend.
2. El frontend hace una solicitud HTTP al backend.
3. El backend procesa la solicitud y consulta la base de datos.
4. El backend responde con los datos o confirmaciones necesarias.
5. El frontend actualiza la UI.

---

## 5. Tecnologías y Herramientas

### Frontend:

- **React (TypeScript), Tailwind CSS, Vite, Framer Motion, Swiper, GSAP, React Router Dom**

### Backend:

- **Node.js, Express, Sequelize, PostgreSQL, bcryptjs, JWT, dotenv, node-schedule**

### Gestión de Dependencias:

- **Yarn**

### Control de Versiones:

- **Git**

### Otras Herramientas:

- **Concurrently, PostCSS, daisyUI**

---

## 6. Patrones de Diseño y Buenas Prácticas

### Patrones de Diseño:

- **MVC (Modelo-Vista-Controlador):** Para separar la lógica de negocio, la interfaz de usuario y los datos, facilitando la mantenibilidad.
- **Service Layer Pattern:** Se utiliza una capa de servicios en el frontend para desacoplar la lógica de la UI de la lógica de comunicación con la API.
- **CRC (Clase-Responsabilidad-Colaborador):** Se utiliza documentación tipo CRC en los encabezados de los componentes principales para definir claramente sus responsabilidades y colaboradores.

### Buenas Prácticas (Clean Code):

- **Documentación en Código:** Comentarios en inglés para la documentación técnica (clases, interfaces, lógica compleja) y español para textos de UI.
- **Tipado Estricto:** Uso de TypeScript con interfaces definidas para evitar el uso de `any`.
- **Principios SOLID:** Aplicación de principios como Responsabilidad Única (SRP) en la refactorización de componentes.

---

## 7. Escalabilidad y Mantenimiento

### Estrategias de Escalabilidad:

- **Escalabilidad Horizontal y Vertical** para manejar mayores volúmenes de tráfico y procesamiento.

### Mantenimiento:

- **Pruebas automatizadas** y **documentación** aseguran la calidad y facilidad de mantenimiento del sistema.

---

## 8. Seguridad

### Medidas de Seguridad:

- **JWT** para autenticación y **bcryptjs** para cifrado de contraseñas.

### Gestión de Vulnerabilidades:

- **Prevención de SQL Injection, XSS y CSRF** mediante validaciones y buenas prácticas en el código.

---

## 9. Consideraciones para el Despliegue

### Entornos:

- **Desarrollo, Testing y Producción** están configurados para pruebas y despliegues sin afectar la estabilidad del sistema.

### Procesos de Despliegue:

1. Pull del código desde el repositorio.
2. Ejecución de pruebas automatizadas.
3. Despliegue en producción.

---

## 10. Anexos

### Glosario:

- **JWT:** Token utilizado para la autenticación de usuarios.
- **ORM:** Técnica para interactuar con bases de datos utilizando objetos.

### Referencias:

- **Documentación de React:** [https://reactjs.org](https://reactjs.org)
- **Documentación de Sequelize:** [https://sequelize.org](https://sequelize.org)
