import httpClient from "../../../shared/utils/httpClient"

// CREATEDRINKS(): recibe los datos de la bebida en el parametro drinkData, 
// hace una peticion POST al endpoint /drinks usando httpClient y envia
// los datos para guardar en la BD.
// Si todo es correcto, devuelve respuesta del servidor pero si algo falla
// muestra el error en consola y lanza el error para manejarlo en el componente.
export async function createDrink(drinkData) {
  try {
    const response = await httpClient.post('/drinks', drinkData);
    return response;
  } catch (error) {
      console.error('Error creando una bebida:', error)
    throw error
  }
}

// GETDRINKS(): obtiene una lista de bebidas desde el backend
// recibe un objeto opcional de filtros ( ej. {brand: 'Coca Cola', limit:10} )
// hace una peticion GET al endpoint /drinks usando httpClient
// Si todo es correcto, devuelve la respuesta con las lista de bebidas, pero si
// algo falla muestra el error en consola y lanza el error para manejarlo en el componente.
export async function getDrinks(filters = {}) {
  try {
    const response = await httpClient.get('/drinks', { params: filters })
    return response
  } catch (error) {
      console.error('Error consultando bebidas:', error)
    throw error
  }
}


export async function deleteDrink(id) {
  try {
    const response = await httpClient.delete(`/drinks/${id}`)
    return response
  } catch (error) {
    console.error('Error eliminado bebidas:', error)
    throw error
  }
}

// Actualizar bebida
export async function updateDrink(id, data) {
  const response = await httpClient.put(`/drinks/${id}`, data);
  return response;
}
