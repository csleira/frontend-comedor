import { useFormik } from "formik";
import { AppButton } from "../../../../ui/components/AppButton";
import { AppCard } from "../../../../ui/components/AppCard";
import { AppInput } from "../../../../ui/components/AppInput";
import { AppTextarea } from "../../../../ui/components/AppTextarea";
import { validateSchema } from "../../../../shared/utils/valiateSchema";
import { drinkSchema } from "../../schemas/drinkSchemas";
import { AppLoader } from "../../../../ui/components/AppLoader";
import { useMemo, useState } from "react";
import { createDrink, updateDrink } from "../../services/drinkService";

export function DrinkForm({ drink = null, mode = 'create', onSave, onCancel }) {
  const initialValues = drink ?? { description: '', brand: '', size:'', type:'', enabled: true }
  const [statusMessage, setStatusMessage] = useState(null)
  const [error, setError] = useState(null)
  const validator = useMemo(() => validateSchema(drinkSchema), [])
  const isReadOnly = mode === 'view';
  const isEditing = mode === 'edit';

  const formik = useFormik({
    initialValues,
    validate: validator,
    validateOnBlur: true,
    validateOnChange: true,
    enableReinitialize: true, // importante para precargar los datos al editar
    onSubmit: async (values, actions) => {
      const validationErrors = validator(values);
      if (Object.keys(validationErrors).length > 0) {
        actions.setErrors(validationErrors)
        actions.setTouched({
          description: true,
          brand: true,
          size: true,
          type: true,
        })
        actions.setSubmitting(false)
        return
      }
      
      try {
        setError(null)
        if (isEditing) {
          await updateDrink(drink.id, values)
          setStatusMessage('Bebida actualizada correctamente.')
        } else {
          await createDrink(values)
          setStatusMessage('Bebida creada correctamente.')
        }
        if (onSave) onSave()
      } catch (err) {
        console.error(err)
        setError(err)
        setStatusMessage('No pudimos guardar la Bebida')
      } finally {
        actions.setSubmitting(false)
      }
    }
  })

  const { values, handleChange, handleBlur, errors, touched, isSubmitting } = formik

  return (
    <div className="space-y-6">
      <AppCard 
        title={isEditing ? "Editar Bebida" : "Crear Bebida"}
        className="text-left"
      >
        <form className="space-y-6" onSubmit={formik.handleSubmit} noValidate>

          {/* ingreso de datos */}
          <div className="space-y-4">
            <AppTextarea 
              id="description"
              label="Descripción"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ej. Descripción de la Bebida"
              required
              error={touched.description && errors.description ? errors.description : undefined}
            />
            <AppInput
              id="brand"
              label="Marca"
              value={values.brand}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ej. Marca de la Bebida"
              required
              error={touched.brand && errors.brand ? errors.brand : undefined}
              readOnly={isReadOnly}
              disabled={isReadOnly}
            />
            <AppInput
              id="size"
              label="Tamaño"
              value={values.size}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ej. 500ml"
              required
              error={touched.size && errors.size ? errors.size : undefined}
              readOnly={isReadOnly}
              disabled={isReadOnly}
            />
            <AppInput
              id="type"
              label="Tipo"
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ej. Gaseosa, Energética, Dietética..."
              required
              error={touched.type && errors.type ? errors.type : undefined}
              readOnly={isReadOnly}
              disabled={isReadOnly}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enabled"
                checked={values.enabled}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly={isReadOnly}
                disabled={isReadOnly}
              />
              <span>Habilitada</span>
            </label>
          </div>

          {statusMessage && (
            <p className={`rounded-lg text-sm border ${error ? 'border-red-500/40 text-red-100' : 'bg-emerald-900/10 text-emerald-100'} px-4 py-3`}>
              {statusMessage}
            </p>
          )}

        {/* Manejo de Botones */}
        <div className="flex gap-2">
            {mode !== 'view' && (
              <>
                <AppButton
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <AppLoader size="md" label="Guardando..." />
                  ) : (
                    mode === 'edit' ? 'Actualizar' : 'Crear'
                  )}
                </AppButton>

                {onCancel && (
                  <AppButton
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </AppButton>
                )}
              </>
            )}

            {mode === 'view' && (
              <AppButton
                variant="secondary"
                onClick={onCancel}
                className="w-full"
              >
                Cerrar
              </AppButton>
            )}
          </div>

        </form>
      </AppCard>
    </div>
  )
}