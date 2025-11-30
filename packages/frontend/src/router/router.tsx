// Objetivo: Define las rutas de la aplicación para que los usuarios puedan navegar entre las diferentes páginas.
// Crea un componente AppRouter que defina las rutas de la aplicación.
// Debe tener las siguientes rutas:
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../features/home/Home.tsx';
import Events from '../features/home/components/eventos/pages/Events.tsx';
import AdminPage from '../features/admin/AdminPage.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import VotacionQRCodeWrapper from '../features/voting/QRCode/VotacionQRCodeWrapper.tsx';
import Sculptures from "../features/home/components/esculturas/pages/Sculptures.tsx";
import Sculptors from "../features/home/components/escultores/pages/Sculptors.tsx";
import LoginPage from "../features/auth/pages/AuthPage.tsx";
import Ranking from "../features/home/components/ranking/Ranking.tsx";
import VotingPage from "../features/voting/VotingPage.tsx";
import EventosDetalles from "../features/home/components/eventos/components/Eventos.detalles.tsx";
import EsculturasDetalles from "../features/home/components/esculturas/components/EsculturasDetalles.tsx";

// Componente que maneja las rutas de la aplicación
function AppRouter() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes> {/* Define las rutas de la aplicación */}
                {/* Ruta principal (home) */}
                <Route path="/" element={<Home />} />

                {/* Ruta para la lista de eventos */}
                <Route path="/eventos" element={<Events />} />

                {/* Ruta para la lista de esculturas */}
                <Route path="/esculturas" element={<Sculptures />} />

                {/* Ruta para la lista de escultores */}
                <Route path="/escultores" element={<Sculptors />} />

                {/* Ruta para la página de login */}
                <Route path="/login" element={<LoginPage />} />

                {/* Ruta protegida que solo los administradores pueden acceder */}
                <Route
                    path="/adminpage"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/events/:id" element={<EventosDetalles />} />
                <Route path="/escultura/:esculturaId" element={<EsculturasDetalles />} />

                {/* VA A USARSE PARA ESCULTORES QR Ruta para el QR de votación de una escultura */}
                <Route path="/codigo-qr/:esculturaID" element={<VotacionQRCodeWrapper />} />

                {/* Ruta para listar los eventos de votación */}
                <Route path="/votacion-escultura/:QrCode/:esculturaId" element={<VotingPage />} />

                {/* Ruta para ver el ranking de escultores */}
                <Route path="/ranking" element={<Ranking />} />
            </Routes>
        </Router>
);
}

export default AppRouter;
