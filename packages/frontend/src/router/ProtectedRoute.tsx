import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser, isAuthenticated } from "../services/AuthService";

const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element; requiredRole?: string }) => {
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
    const [redirectToLogin, setRedirectToLogin] = useState(false); // Estado para manejar la redirección

    useEffect(() => {
        // Función asincrónica para verificar la autenticación y el rol del usuario
        const fetchUser = async () => {
            if (!isAuthenticated()) {
                // Si no está autenticado, redirigir a login
                setRedirectToLogin(true);
                setLoading(false);
                return;
            }

            try {
                // Intentar obtener el usuario desde el backend
                const fetchedUser = await getUser();
                // Verificar si el usuario tiene el rol necesario
                if (fetchedUser && (!requiredRole || fetchedUser.role === requiredRole)) {
                    setRedirectToLogin(false); // Si tiene el rol correcto, no redirigir
                } else {
                    setRedirectToLogin(true); // Si no tiene el rol correcto, redirigir
                }
            } catch {
                // Si ocurre un error al obtener el usuario, redirigir a login
                setRedirectToLogin(true);
            } finally {
                // Terminar el estado de carga
                setLoading(false);
            }
        };

        fetchUser(); // Llamar a la función de verificación cuando se monta el componente
    }, [requiredRole]); // Dependencia en el rol requerido, para actualizar si cambia

    if (loading) return <div>Cargando...</div>; // Mostrar mensaje de carga mientras se valida el usuario

    if (redirectToLogin) return <Navigate to="/login" />; // Si necesita redirigir, hacerlo

    return children; // Si no hay redirección, renderizar los hijos del componente
};

export default ProtectedRoute;