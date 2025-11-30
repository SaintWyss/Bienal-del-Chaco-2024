# Explicación de cada Parte de la Estructura del Backend

### **1. `config/`**
- Contiene configuraciones generales como la conexión a la base de datos (Sequelize) y las variables de entorno.

### **2. `controllers/`**
- Manejan las solicitudes HTTP y delegan la lógica de negocio a los servicios.
- **Ejemplo:** `eventoController.js` procesará solicitudes para eventos (`GET /eventos`, `POST /eventos`).

### **3. `middlewares/`**
- Código que se ejecuta antes de las rutas para verificar autenticaciones, permisos o manejar errores.

### **4. `models/`**
- Define la estructura de las tablas en PostgreSQL usando Sequelize.
- Se configuran las relaciones entre modelos (por ejemplo, un `Evento` tiene muchas `Esculturas`).

### **5. `routes/`**
- Define las rutas de la API. Cada archivo agrupa rutas relacionadas (ejemplo: todas las rutas de escultores estarán en `escultorRoutes.js`).

### **6. `services/`**
- Contienen la lógica de negocio (procesamiento de datos). Los controladores delegan estas tareas a los servicios.
- **Ejemplo:** `qrService.js` generará códigos QR dinámicos con lógica específica.

### **7. `utils/`**
- Funciones genéricas que pueden ser utilizadas en varias partes del proyecto (por ejemplo, generar JWT o QR).

### **8. `scripts/`**
- Contiene scripts personalizados que pueden automatizar procesos repetitivos.
  
### **9. `tasks/`**
- Incluye tareas programadas o procesos recurrentes que se ejecutan en segundo plano.
 
### **10. `index.js`**
- Punto de entrada donde se configura el servidor, se cargan las rutas y se inicia la aplicación.
