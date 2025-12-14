import { useCallback, useState } from "react";
import { useDrinks } from "./useDrinks";
import { deleteDrink } from "../services/drinkService";

export function useDeleteDrink() {
  const { fetchDrinks } = useDrinks();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const remove = useCallback(
    async (id) => {
      setIsDeleting(true);
      setError(null);

      try {
        await deleteDrink(id);
        await fetchDrinks();
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setIsDeleting(false);
      }
    },
    [fetchDrinks]
  );

  return {
    deleteDrink: remove,
    isDeleting,
    error,
    resetError: () => setError(null),
  };
}