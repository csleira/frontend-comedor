import { useCallback, useMemo, useState } from "react";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../../../constants";
import { loginRequest, registerRequest } from "../services/authService";
import { AuthContext } from "./AuthContext";

function getClientStorage() {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage;
}

function readStoredAuth() {
  const storage = getClientStorage();
  if (!storage) {
    return { token: null, user: null }
  }
  
  const token = storage.getItem(TOKEN_STORAGE_KEY)
  const rawUser = storage.getItem(USER_STORAGE_KEY)

  if (!token || !rawUser) {
    return { token: null, user: null }
  }

  try {
    const user = JSON.parse(rawUser);
    return { token, user }
  } catch (error) {
    storage.removeItem(TOKEN_STORAGE_KEY);
    storage.removeItem(USER_STORAGE_KEY);
    console.error('Error al parsear el usuario almacenado:', error);
    return { token: null, user: null};
  }
}

// AUTHPROVIDER(): es una clase funcional con hooks para AUTH, que:
// * Tiene "parametro": children, representa todos los componentes que están dentro del <AuthProvider> cuando lo usás en JSX
// * Tiene “propiedades”: token, user, status (estado con useState)
// * Tiene “métodos”: login, register, logout (funciones con useCallback)
// * Expone todo mediante el Context (value)
// * Funciona como un objeto que controla la autenticación para toda la app
// Persiste el token y usuario en localStorage (o storage del cliente)
// Hace que cualquier componente descendiente pueda acceder a estos datos y funciones a través del Context (AuthContext)
export function AuthProvider({ children }) {
  const initialAuth = readStoredAuth();
  const [token, setToken] = useState(initialAuth.token);
  const [user, setUser] = useState(initialAuth.user)
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const persistAuth = useCallback((nextToken, nextUser) => {
    const storage = getClientStorage();
    setToken(nextToken);
    setUser(nextUser);

    if (!storage) {
      return;
    }

    if (nextToken && nextUser) {
      storage.setItem(TOKEN_STORAGE_KEY, nextToken);
      storage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      storage.removeItem(TOKEN_STORAGE_KEY);
      storage.removeItem(USER_STORAGE_KEY);
    }
  }, [])

  const login = useCallback(async (credentials) => {
    setStatus('loading');
    try {
      const data = await loginRequest(credentials);
      if(!data?.access_token) {
        throw new Error('Token no fue encontrado');
      }
      persistAuth(data.access_token, data.user ?? null);
      setStatus('authenticated')
      return data;
    } catch (error) {
      console.log('Error en el provider:', error)
      setStatus('error');
      setErrorMessage(error.message);
      throw error;
    }
  }, [persistAuth])

  const register = useCallback(
    async (payload) => {
      try {
        const data = await registerRequest(payload);
        if (data?.token) {
          persistAuth(data.token, data.user ?? null);
          setStatus('authenticated');
        } else {
          setStatus('registered');
        }

        return data;
      } catch (error) {
        console.log('provider_error',error)
        setStatus('error')
        setErrorMessage(error.message);
        throw error;
      }
    },
    [persistAuth],
  )

  const logout = useCallback(() => {
    persistAuth(null, null);
    setStatus('idle');
  }, [persistAuth])

  const value = useMemo(() => ({
    token,
    user,
    status,
    errorMessage, // Cagada
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
  }), [login, token, user, status, errorMessage, register, logout])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}