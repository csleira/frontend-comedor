import { useAuth } from '../hooks/useAuth';

export function usePermissions() {
  const { token, user } = useAuth();
  const isLogged = Boolean(token);
  const isAdmin = isLogged && user?.role > 0;
  return { isLogged, isAdmin };
}