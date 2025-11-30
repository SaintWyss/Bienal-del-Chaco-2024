# Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local.

## Requisitos Previos 

Para más detalles, consulta [Pre Condiciones](precondicion.md).

## Clonar el Repositorio

1. **Ubicación:** Crea una carpeta en tu computadora en donde quieras guardar el proyecto o en el mismo escritorio.
2. **Terminal:** Abre la terminal o consola de comandos.
3. **Cambiar el Directorio:** Navega a la carpeta que creaste usando el comando: `cd RUTA_DE_ACCESO` (Reemplaza `RUTA_DE_ACCESO` con la ruta de la carpeta que creaste).
4. **Inicializar Git:** Si no has inicializado Git en esa carpeta, puedes hacerlo con: `git init`
5. **Clonar el Repositorio:** `git clone https://github.com/FRRe-DS/2024-11-TPI.git`

# Ejecutar el Proyecto

## Instalación de Dependencias

1. **Instalar Yarn

    ```bash
    npm install -g yarn
    ```

2. **Navegar al Directorio del Frontend:**

    ```bash
    cd packages/frontend
    ```

3. **Instalar Dependencias de React:**

    ```bash
    npm install react@latest react-dom@latest
    yarn add react@latest react-dom@latest
   yarn add -D @types/react @types/react-dom
   yarn add axios

    ```

4. **Instalar Tailwind CSS y Herramientas Relacionadas:**

    ```bash
    yarn add -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    yarn add -D daisyui@latest
    ```

5. **Agregar FontAwesome:**

    ```bash
    yarn add @fortawesome/fontawesome-free
   
    ```

6. **Instalar Dependencias Adicionales:**

   Revisa el archivo `package.json` para cualquier dependencia adicional que pueda ser necesaria y usa Yarn para instalarlas:

    ```bash
    yarn install
    ```

7. **Navega al Directorio del Backend:**

   Abre una nueva terminal en la raiz e ingresa:

    ```bash
    cd packages/backend
    ```

8. **Instalar Dependencias de backend:**

    ```bash
   yarn add nodemon --dev
   yarn add bcryptjs
   yarn add mongoose
   yarn add jsonwebtoken
   
   yarn install
    ```

## Configuración del Entorno

Estas configuraciones deberían estar realizadas automáticamente, pero es importante verificarlas:

1. **Configurar Tailwind CSS:**

   Asegúrate de que los archivos de configuración (`tailwind.config.js` y `postcss.config.js`) estén correctamente configurados para incluir tus rutas de archivos CSS y componentes.

2. **Configurar Vite:**

   Verifica que tu archivo `vite.config.js` esté configurado correctamente para trabajar con Tailwind CSS y cualquier otro plugin que necesites.

3. **Configurar TypeScript:**

   Si aún no lo has hecho, crea y configura un archivo `tsconfig.json` en el directorio raíz de tu proyecto con las opciones necesarias para TypeScript.

## Ejecutar el Proyecto

1. **Iniciar el Servidor de Desarrollo:**

    ```bash
    yarn dev
    ```

   Esto iniciará el servidor de desarrollo y podrás ver la aplicación en `http://localhost:3000` (o en el puerto que hayas configurado).

2. **Construir el Proyecto para Producción:**

    ```bash
    yarn build
    ```

   Este comando construirá tu proyecto para producción, optimizando los archivos y generando la salida en el directorio `dist`.

3. **Iniciar el Servidor de Producción (Opcional):**

    ```bash
    yarn preview
    ```

   Esto te permitirá ver una vista previa de la versión de producción de tu aplicación.
