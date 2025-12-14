import { useState, useCallback, useMemo, useEffect } from "react";
import { getDrinks } from "../services/drinkService";
import { DrinksContext } from "./DrinksContext";

// DRINKPROVIDER(): es una clase funcional con hooks para DRINKS, que:
// * Tiene "parametro": children, representa todos los componentes que están dentro del <DrinkProvider> cuando lo usás en JSX
// * Tiene “propiedades”: drinks, loading, error (estado con useState)
// * Tiene “métodos”: fetchDrinks, refetch, logout (funciones con useCallback)
// Al montarse, ejecuta fetchDrinks automáticamente con useEffect
// Expone el estado y métodos mediante el contexto DrinksContext (value)
// Permite que cualquier componente hijo acceda a drinks, loading, error y funciones para refrescar las bebidas

export function DrinksProvider({ children }) {
  // lista de bebidas
  const [drinks, setDrinks] = useState([])
  // indica si la API esta cargando
  const [loading, setLoading] = useState(false)
  // guarda  errores ocurridos al traer las bebidas
  const [error, setError] = useState(null)

  // funcion FECTHDRINKS():
  const fetchDrinks = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
        // Trae las bebidas de la API usando el service drinkService
        const { data } = await getDrinks()
        
        // Verificamos que data contenga un array de drinks
        if (data?.data && Array.isArray(data.data)) {
          setDrinks(data.data);
        } else {
          setDrinks([]);  // Si no hay drinks, establece el estado como un array vacío
        }
    } catch (error) {
        setError(error)
        console.error('Error fetching drinks:', error)
    } finally {
        setLoading(false)
    }
  }, [])

  // REFETCH(): Para volver a obtener las bebidas
  const refetch = useCallback(() => {
    return fetchDrinks()
  }, [fetchDrinks])

  // hook useEffect: Cuando se monte el componente llamamos a fetchDrinks
  useEffect(() => {
    fetchDrinks()
  }, [fetchDrinks])

  // hook useMemo: Memoriza el valor del contexto para evitar renderizados innecesarios
  const value = useMemo(() => ({
    drinks,
    loading,
    error,
    refetch,
    fetchDrinks,
  }), [drinks, loading, error, refetch, fetchDrinks])

  return (
    <DrinksContext.Provider value={value}>
      {children}
    </DrinksContext.Provider>
  )
}