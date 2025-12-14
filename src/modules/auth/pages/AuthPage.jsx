import { useState } from "react";
import { AppButton } from "../../../ui/components/AppButton";
import { AppCard } from "../../../ui/components/AppCard";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

const authOptions = [
  { key: "login", label: "Iniciar Sesión" },
  { key: "register", label: "Crear Cuenta" },
];

export function AuthPage() {
  const [activeView, setActiveView] = useState("login");

  let viewContent;

  if (activeView === "login") {
    viewContent = <LoginForm />;
  } else {
    viewContent = <RegisterForm />;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#ffb84d10,#05060f))] px-4 py-12">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <AppCard
          title="Comedor"
          subtitle="Accede a los servicios del comedor y conoce nuestras novedades."
        >
          <div className="mt-6 mb-6 flex items-center justify-center gap-4">
            {authOptions.map((option) => (
              <AppButton
                key={option.key}
                variant={activeView === option.key ? "primary" : "secondary"}
                type="button"
                onClick={() => setActiveView(option.key)}
              >
                {option.label}
              </AppButton>
            ))}
          </div>

          {viewContent}
        </AppCard>
      </div>
    </main>
  );
}

