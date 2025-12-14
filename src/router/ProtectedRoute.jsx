// PROTECTEDROUTE: Es un componente wrapper que se usa en React Router para proteger rutas privadas.
// Envuelve rutas que solo deberían ser accesibles si el usuario está autenticado.
// *  useLocation() → obtiene la ruta actual del navegador (pathname, search, etc.)
// *  useAuth() → custom hook que devuelve información de autenticación (isAuthenticated es true o false)
// Si el usuario no está autenticado:
//    Redirige a la ruta indicada en redirectTo (por defecto /auth)
//    replace → reemplaza la URL en el historial (no permite “volver atrás” a la ruta privada)
// Si el usuario sí está autenticado:
//    renderiza un <Outlet />
//    <Outlet /> es donde se renderizan las rutas hijas definidas en React Router
//    state={{ from: location }} → guarda la ruta original para que, después de loguearse, 
//    pueda redirigir al usuario de vuelta

import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

export function ProtectedRoute({ redirectTo = '/auth'}) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }

  return <Outlet />
}