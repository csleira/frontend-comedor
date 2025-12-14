import { useState } from "react";
import { AppButton } from "../../../ui/components/AppButton";
import { AppCard } from "../../../ui/components/AppCard";
import { AppLoader } from "../../../ui/components/AppLoader";
import { useDrinks } from "../hooks/useDrinks";
import { usePermissions } from "../../auth/hooks/usePermissions";
import { useDeleteDrink } from "../hooks/useDeleteDrink";
import { DrinkForm } from "./components/DrinkForm";

export function DrinkPage() {
  const { loading, error, drinks, refetch } = useDrinks();
  const { isAdmin } = usePermissions();
  const { deleteDrink, isDeleting } = useDeleteDrink();

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDrink, setEditingDrink] = useState(null);
  const [formMode, setFormMode] = useState("create");  // formode: create, edit, view
 

  const openCreateForm = () => {
    setEditingDrink(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const openEditForm = (drink) => {
    setEditingDrink(drink);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const openViewForm = (drink) => {
    setEditingDrink(drink);
    setFormMode("view");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingDrink(null);
    setIsFormOpen(false);
  };

  const handleSave = async () => {
    closeForm();
    refetch();
  };

  if (loading) {
    return (
      <AppCard title="Bebidas" subtitle="Consulta nuestra oferta en Bebidas">
        <div className="flex items-center justify-center py-12">
          <AppLoader size="lg" label="Cargando bebidas..." />
        </div>
      </AppCard>
    );
  }

  if (error) {
    return (
      <AppCard title="Bebidas" subtitle="Consulta nuestra oferta en Bebidas">
        <div className="rounded-lg border border-red-500/60 bg-red-950/50 px-4 py-3 text-sm text-red-200">
          {error?.message}
        </div>
      </AppCard>
    );
  }

  return (
    <AppCard title="Bebidas" subtitle="Consulta nuestra oferta en Bebidas">
      {/* Botón crear (solo admin) */}
      {isAdmin && (
        <div className="flex justify-end mb-4">
          <AppButton onClick={openCreateForm}>
            Agregar Bebida
          </AppButton>
        </div>
      )}

      {/* Formulario */}
      {isFormOpen && (
        <DrinkForm
          drink={editingDrink}
          mode={formMode}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}

      {drinks.length === 0 ? (
        <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950/60 p-6 text-center text-slate-400">
          No hay Bebidas disponibles.
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {drinks.map((drink) => (
            <article
              key={drink.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
            >
              <div className="flex items-center justify-between text-yellow-400">
                <span className="truncate">
                  ID #{String(drink.id).slice(0, 8)}
                </span>

                <div className="flex gap-2">
                  <AppButton
                    size="sm"
                    variant="secondary"
                    onClick={() => openViewForm(drink)}
                  >
                    Leer más
                  </AppButton>

                  {isAdmin && (
                    <>
                      <AppButton
                        size="sm"
                        onClick={() => openEditForm(drink)}
                      >
                        Editar
                      </AppButton>

                      <AppButton
                        size="sm"
                        variant="danger"
                        disabled={isDeleting}
                        onClick={() => deleteDrink(drink.id)}
                      >
                        {isDeleting ? "Eliminando..." : "Eliminar"}
                      </AppButton>
                    </>
                  )}
                </div>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-slate-100">
                {drink.brand}
              </h3>

              <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                {drink.description}
              </p>
            </article>
          ))}
        </div>
      )}
    </AppCard>
  );
}