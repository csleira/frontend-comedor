// NOTA: Operador ?. (optional chaining). 
// Este operador sirve para acceder a propiedades sin que el código rompa si algo es null o undefined.
// “Si response existe, accedo a data”, “Si data existe, accedo a errors”, “Si algo no existe, devuelvo undefined sin romper”
// ?. → "Si existe, accedo. Si NO, devuelvo undefined sin romper."
// NOTA: El signo ?? (nullish coalescing)
// Siginifica “Si lo de la izquierda es null o undefined, usa la derecha.”

import httpClient from "../../../shared/utils/httpClient";

// NORMALIZEERROR(): Si el backend devuelve errores validados o errores de Axios, los muestra sino
// lanza un error nuevo con lo errores validos y si ninguno es valido muestra el predefinido.
// error.response → Existe una respuesta del servidor, 
// error.response.data → Tiene un cuerpo (payload)
// error.response.data.errors → Tiene un campo errors
// sino ha errores en la respuesta entonces error.message ( esto cubre errores como usuario o pass invalida,
// token invalido, error del backend, error Axios o problemas en la red )
const normalizeError = (error) => {
  if (error.response?.data?.errors) {
    console.log('error en serio', error);
    return error.response.data.errors;
  }

  const message = error.response?.data?.message ?? error.message ?? 'Error desconocido, por favor intente nuevamente';
  console.log('error', error);
  console.log('mensaje', message);

  return new Error(message);
}

// LOGINREQUEST(): inicia sesión de un usuario en el backend
// recibe un objeto con las credenciales del usuario (ej. { email: 'usuario@mail.com', password: '123456' })
// hace una petición POST al endpoint /auth/login usando httpClient
// Si todo es correcto, devuelve los datos del usuario y token desde response.data
// Si algo falla, normaliza el error usando normalizeError y lo lanza para manejarlo en el componente
export const loginRequest = async (credentials) => {
  try {
    const response = await httpClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}


// REGISTERREQUEST(): registra un nuevo usuario en el backend
// recibe un objeto ( en este caso se llama payload ) con los datos del usuario a registrar 
// (ej. { name: 'Juan', email: 'usuario@mail.com', password: '123456' })
// hace una petición POST al endpoint /auth/register usando httpClient
// Si todo es correcto, devuelve los datos del usuario desde response.data
// Si algo falla, normaliza el error usando normalizeError y lo lanza para manejarlo en el componente
export const registerRequest = async (payload) => {
  try {
    const response = await httpClient.post('/auth/register', payload);
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}
