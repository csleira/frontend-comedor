// Es un custom hook que simplifica el acceso al DrinksContext.
// Usa useContext para obtener el valor del contexto (drinks, loading, error, fetchDrinks, etc.).
// Valida que el hook se use dentro de un <DrinksProvider>.
// Si no, lanza un error claro, lo que ayuda a detectar bugs rápido.
// Devuelve el contexto completo, listo para usar en cualquier componente hijo.

import { useContext } from "react";
import { DrinksContext } from "../context/DrinksContext";

export function useDrinksContext() {
  const context = useContext(DrinksContext)
  if (!context) {
    throw new Error('useDrinksContext debe ser usado dentro de un DrinksProvider');
  }
  return context;
}

export function useDrinks() {
  return useDrinksContext();
}
