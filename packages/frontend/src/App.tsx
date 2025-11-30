// Importa el componente de rutas y el proveedor del contexto de eventos
import AppRouter from './router/router.tsx';
import { EventProvider } from './features/home/components/eventos/context/EventContext';

// Componente principal de la aplicación
function App() {
    return (
        // Proveedor que envuelve la aplicación para manejar el estado global relacionado con los eventos
        <EventProvider>
            <main className="App min-h-screen flex flex-col">
                {/* Componente que maneja las rutas de la aplicación */}
                <AppRouter />
            </main>
        </EventProvider>
    );
}

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default App;