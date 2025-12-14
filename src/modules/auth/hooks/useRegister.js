import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";

export function useRegister() {
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = useCallback(
    async (credentials) => {
      setIsSubmitting(true);
      setError(null);

      try {
        const response = await register(credentials);
        return response
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setIsSubmitting(false);
      }
    },
    [register]
  )

  return {
    register: handleRegister,
    isSubmitting,
    error,
    resetError: () => setError(null),
  }
}