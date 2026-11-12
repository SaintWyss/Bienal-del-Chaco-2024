<h1 align="center">Bienal-del-Chaco-2024</h1>

<p align="center"><strong>Proyecto académico para explorar eventos y esculturas.</strong><br/>React · TypeScript · Express</p>


Proyecto académico full stack inspirado en la Bienal del Chaco 2024. El repositorio reúne la aplicación web, el backend y código compartido para explorar el catálogo y las funciones del proyecto.

**Estado:** proyecto académico histórico. La disponibilidad del despliegue y de sus servicios puede variar.

## Ejecutar en desarrollo

El repositorio usa workspaces de Yarn. Para preparar una copia local:

```bash
git clone https://github.com/SaintWyss/Bienal-del-Chaco-2024.git
cd Bienal-del-Chaco-2024
yarn install
yarn dev
```

Antes de iniciarlo, revisá las [precondiciones](docs/Guias/precondicion.md), la configuración del backend y la [guía de instalación](docs/Guias/installation.md). La guía conserva la URL del repositorio académico original; para esta copia usá la URL indicada arriba. La ejecución local no fue verificada en esta revisión.

## Deploy Front

https://bienal-del-chaco2024-frontend-9xyl.vercel.app/

## Actualizaciones Recientes (Refactorización 2025)

El proyecto ha pasado por un proceso de refactorización para mejorar la calidad del código y la mantenibilidad:

- **Clean Code:** Se han aplicado principios de código limpio, mejorando el tipado y la nomenclatura.
- **Documentación CRC:** Los componentes principales ahora cuentan con documentación CRC (Clase-Responsabilidad-Colaborador) en sus encabezados.
- **Estandarización:** Comentarios técnicos en inglés y textos de interfaz en español.
- **Optimización:** Mejoras en la estructura de carpetas `features/` y optimización de componentes clave (`Home`, `Admin`, `Auth`).

## Contenido

- [Introducción](./docs/Guias/introduction.md)
- [Pre Condición](./docs/Guias/precondicion.md)
- [Instalación](./docs/Guias/installation.md)
- [Arquitectura del Proyecto](./docs/arquitectura/arquitectura.md)
- [Documentación de API](./docs/Guias/doc_api.md)

## Trabajo Práctico

- [TPI](./docs/Guias/tpi.md)

## Guia de Git y Tailwind

- [Guia de Git](./docs/Guias/github_guide.md)
- [Guia de Tailwind CSS](./docs/Guias/Tailiwind.md)

## Licencia

El README anterior indicaba MIT, pero esta copia no incluye actualmente un archivo de licencia. Consultá a los autores para aclarar los términos de reutilización.
