import { z } from 'zod'

export const drinkSchema = z.object({
  description: z
    .string()
    .min(15, 'La descripcion debe tener al menos 15 caracteres.')
    .max(120, 'Hasta 120 caracteres.'),
  brand: z
    .string()
    .min(3, 'La marca deebe tener al menos 3 caracteres.')
})