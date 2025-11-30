# Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local.

## Requisitos Previos

Para más detalles, consulta [Pre Condiciones](precondicion.md).

## Clonar el Repositorio

1. **Ubicación:** Crea una carpeta en tu computadora donde quieras guardar el proyecto.
2. **Terminal:** Abre la terminal o consola de comandos.
3. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/FRRe-DS/2024-11-TPI.git
   cd 2024-11-TPI
   ```

# Ejecutar el Proyecto

## 1. Instalación de Dependencias (Frontend)

Navega al directorio del frontend e instala las dependencias utilizando Yarn (recomendado) o NPM.

```bash
cd packages/frontend
yarn install
```

_Nota: Esto instalará automáticamente React, Tailwind CSS, Axios y todas las librerías necesarias definidas en `package.json`._

## 2. Instalación de Dependencias (Backend)

Abre una nueva terminal, navega al directorio del backend e instala las dependencias.

```bash
cd packages/backend
yarn install
```

_Nota: Esto instalará Express, Sequelize, Nodemon y demás herramientas necesarias._

## 3. Configuración del Entorno

Asegúrate de crear los archivos `.env` en ambas carpetas (`packages/frontend` y `packages/backend`) basándote en los archivos de ejemplo `.env.example` si existen, o configurando las variables necesarias (Base de datos, JWT Secret, etc.).

## 4. Ejecutar el Proyecto

### Iniciar Backend

En la terminal del backend:

```bash
yarn dev
```

### Iniciar Frontend

En la terminal del frontend:

```bash
yarn dev
```

La aplicación estará disponible generalmente en `http://localhost:5173` (Frontend) y `http://localhost:3000` (Backend).

## Construcción para Producción

Para generar la versión de producción del frontend:

```bash
cd packages/frontend
yarn build
```

Esto generará la carpeta `dist` con los archivos optimizados.
