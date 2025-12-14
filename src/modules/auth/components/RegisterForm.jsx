import { AppInput } from "../../../ui/components/AppInput";
import { AppButton } from "../../../ui/components/AppButton";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
  const navigate = useNavigate();
  const { register, isSubmitting, error, resetError } = useRegister();
  const [statusMessage, setStatusMessage] = useState(null);

  const userRegister = {
    name: '',
    username: '',
    email: '',
    password: '',
  }
  const [user, setUser] = useState(userRegister)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      resetError();
      setStatusMessage(null);
      await register(user);
      navigate('/login')
      setStatusMessage('Cuenta creada.');
    } catch (error) {
      setStatusMessage(error);
    }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <AppInput 
              id="name"
              name="name"
              label="Nombre"
              value={user.name}
              onChange={handleChange}
              placeholder="Juan Alberto Perez"
              autoComplete="name"
              required
              error={error ? error?.name : undefined}
            />
            <AppInput
              id="username"
              name="username"
              label="Nombre de Usuario"
              type="text"
              placeholder="japerez67"
              value={user.username}
              onChange={handleChange}
              autoComplete="username"
              required
              error={error ? error?.username : undefined}
            />
            <AppInput
              id="email"
              name="email"
              label="Correo electrónico"
              type="text"
              placeholder="ejemplo@gmail.com"
              value={user.email}
              onChange={handleChange}
              autoComplete="email"
              required
              error={error ? error?.email : undefined}
            />
            <AppInput
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              placeholder="********"
              value={user.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              error={error ? error?.password : undefined}
            />
          </div>

          {error ? (
            <p className="rounded-lg border border-red-500/60 bg-red-950/50 px-4 py-3 text-sm text-red-200">{Object.values(error).join(' - ')}</p>
          ) : null}

          {statusMessage && !error && (
            <p className="rounded-lg border border-emerald-500/40 bg-emerald-900/10 px-4 py-3 text-sm text-emerald-100">{statusMessage}</p>
          )}

          <AppButton
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            Crear Cuenta
          </AppButton>
        </form>
  );
}
