// Define la estructura de rutas de la aplicación
// Usa <MainLayout /> como layout principal para todas las rutas hijas
// Define rutas públicas:
//      * / → HomePage
//      * /auth → AuthPage
//      * /drink → DrinkPublicPage
// Define rutas privadas protegidas por ProtectedRoute:
//      * /drink/create → DrinkPrivatePage
//      * /dashboard → contenido de ejemplo
// Cualquier URL que no coincida redirige a /

import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../modules/home/pages/HomePage";
import { AuthPage } from "../modules/auth/pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { DrinkPage } from "../modules/drink/pages/DrinkPage";



export const mainRouter = createBrowserRouter([
  {
    path: '/',   // Ruta principal que usa el MainLayout
    element: <MainLayout />,
    children: [   // Rutas internas que se renderizan dentro del MainLayout usando <Outlet/>
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <AuthPage />},
      { path: 'drink', element: <DrinkPage />},
      {
        element: <ProtectedRoute />,
        children: [ // Define rutas privadas protegidas por ProtectedRoute
          { 
            path: 'settings', 
            element: <h2>Configuracion, Esto es una ruta Privada. En construccion 🚧 </h2>},
          { 
            path: 'dashboard',
            element: <h2>Dashboard, Esto es una ruta Privada. En construccion 🚧 </h2>}
        ]

      }
    ]
  },
  {  path: '*', element: <Navigate to="/" replace />}  // Redirige cualquier URL no definida a / 

])