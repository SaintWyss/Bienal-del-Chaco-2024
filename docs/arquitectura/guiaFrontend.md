# Explicación de cada Parte de la Estructura del Frontend

### **1. `dist/`**
- Contiene los archivos generados tras la compilación para producción. Este directorio incluye HTML, CSS y JavaScript optimizados.

### **2. `public/`**
- Almacena los archivos estáticos que no requieren procesamiento (por ejemplo, el archivo `index.html` base, imágenes públicas, fuentes).

### **3. `src/`**
- Carpeta principal que contiene todo el código fuente del proyecto.

### **4. `assets/images/`**
- Almacena imágenes utilizadas en el proyecto, organizadas para fácil acceso y mantenimiento.

### **5. `features/`**
- Contiene módulos específicos relacionados con funcionalidades clave del proyecto, organizados por características.

### **6. `layout/Navbar/`**
- Incluye componentes relacionados con el diseño del `Navbar`, como subcomponentes, estilos, y lógica específica.

### **7. `components/`**
- Almacena componentes reutilizables y modulares que pueden ser usados en diferentes partes del proyecto.
- **Ejemplo:** Botones, cuadros de diálogo, formularios, etc.

### **8. `hooks/`**
- Incluye hooks personalizados de React que encapsulan lógica reutilizable.
- **Ejemplo:** `useAuth()`, `useFetch()`, o cualquier hook que mejore la organización del código.

### **9. `navbar/`**
- Contiene componentes, estilos y lógica específica para el menú de navegación.

### **10. `sidebar/`**
- Similar a `navbar/`, pero enfocado en la barra lateral de navegación.

### **11. `styles/`**
- Contiene archivos de estilos globales o específicos de componentes en CSS o frameworks CSS-in-JS.

### **12. `Navigation.tsx`**
- Componente principal que gestiona la navegación dentro de la aplicación (puede incluir un router o links).

### **13. `router/`**
- Contiene las configuraciones de enrutamiento de la aplicación, como el mapeo de rutas a componentes específicos.

### **14. `services/`**
- Incluye servicios que interactúan con APIs externas o manejan lógica relacionada con la comunicación con el backend.
  - **`AuthService.ts`:** Maneja autenticación y autorización.
  - **`EventService.ts`:** Administra solicitudes relacionadas con eventos.
  - **`ImagenService.ts`:** Gestiona operaciones relacionadas con imágenes.
  - **`QrService.ts`:** Genera y administra códigos QR.
  - **`SculptureService.ts`:** Maneja datos relacionados con esculturas.
  - **`VotingService.ts`:** Administra votos y resultados.
  - **`axiosConfig.ts`:** Configuración global de Axios para peticiones HTTP.
  - **`escultorService.ts`:** Gestiona la interacción con la API para datos de escultores.
  - **`tokenService.ts`:** Administra el almacenamiento y renovación de tokens.
  - **`userService.ts`:** Maneja la lógica relacionada con usuarios.

### **15. `App.tsx`**
- Componente principal de la aplicación que organiza la estructura general y las rutas principales.

### **16. `index.html`**
- Archivo HTML base que carga el bundle generado y es el punto de partida de la aplicación en producción.
