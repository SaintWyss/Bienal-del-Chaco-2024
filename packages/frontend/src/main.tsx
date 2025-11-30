import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';

// Ajusta dinámicamente el tamaño del viewport
const setViewportHeight = () => {
    // Calcula el 1% de la altura de la ventana y establece una variable CSS para usarla en el diseño
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Llamada inicial para establecer la altura del viewport
setViewportHeight();

// Agrega un event listener para ajustar el tamaño del viewport cuando la ventana cambie de tamaño
window.addEventListener('resize', setViewportHeight);

// Verifica si existe el contenedor principal y lanza un error si no se encuentra
const rootElement = document.getElementById('root');
if (!rootElement) {
    // Error lanzado si no se encuentra el elemento #root en el DOM
    throw new Error("No se encontró el elemento #root en el DOM");
}

// Crea el root de React
const root = ReactDOM.createRoot(rootElement);

// Renderiza la aplicación React dentro del contenedor principal
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);