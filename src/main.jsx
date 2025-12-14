import { StrictMode } from 'react'  // Modo estricto de React, que ayuda a detectar problemas
import { createRoot } from 'react-dom/client'
import './index.css'          // Aca se cargan Tailwind CSS y los estilos globales
import App from './App.jsx'   // Componente incial de la aplicacion
import { AuthProvider } from './modules/auth/context/AuthProvider.jsx'
import { DrinksProvider } from './modules/drink/context/DrinksProvider.jsx'

// Esta funcion monta la App React en el DOM
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DrinksProvider>
        <App />
      </DrinksProvider>
    </AuthProvider>
  </StrictMode>,
)
