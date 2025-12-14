// Este archivo crea un cliente HTTP usando Axios que:
// Configura una URL base para todas las solicitudes.
// Añade automáticamente el token JWT a cada petición si existe en localStorage.
// Detecta errores 401 (no autorizado) y borra sesión del usuario.
// Exporta este cliente para usarlo en toda la app.
// NOTA: Los interceptores se activan automáticamente para la instancia de Axios, por
// lo tanto se activan cada vez que se hace una solicitud con httpClient

import axios from 'axios';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../../constants';

const API_URL = import.meta.env.VITE_API_URL;

// axios.create() crea un nuevo cliente HTTP independiente, con su propia configuración.
// se define la URL base para todas las peticiones.
const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',  //Esto le dice al servidor que stás enviando datos en formato JSON en el body
  },
});

// Interceptor de requests (antes de enviar la peticion)
// Busca el tocken JWT en el localstorage. Si existe lo añade al header.
// Esto hace que todas las peticiones al backend se envíen autenticadas sin que tú tengas que añadir el token cada vez.
httpClient.interceptors.request.use((config) => {

  if (typeof window === 'undefined') {   // para saber si se ejecuta en navegador o en el servidor(en Node no existe window)
    return config;
  }

  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
})

// Interceptor de respuestas (cuando la API responde ).
// Desloguea al usuario, si el token ya no es valido
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }

    return Promise.reject(error);
  }
)

export default httpClient;