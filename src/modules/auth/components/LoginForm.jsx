import { useState } from "react";
import { AppInput } from "../../../ui/components/AppInput";
import { AppButton } from "../../../ui/components/AppButton";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isSubmitting, error, resetError } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita recargar la página
    resetError();
    setStatusMessage(null);

    try {
      await login({ email, password });
      setStatusMessage('Inicio de sesión exitoso');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setStatusMessage(null); // limpia mensaje de éxito si hay error
      console.log('Error capturado en LoginForm:', err.message);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <AppInput
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="ejemplo@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <AppInput
          id="password"
          label="Contraseña"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      {/* MENSAJE DE ERROR */}
      {error && (
        <p className="rounded-lg border border-red-500/60 bg-red-950/50 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      {/* MENSAJE DE ÉXITO */}
      {statusMessage && !error && (
        <p className="rounded-lg border border-green-500/60 bg-green-950/50 px-4 py-3 text-sm text-green-200">
          {statusMessage}
        </p>
      )}

      <AppButton
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
      </AppButton>
    </form>
  );
}
