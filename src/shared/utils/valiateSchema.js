export const validateSchema = (schema) => {
  return (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return {}
    }
  
    const fieldErrors = result.error.flatten().fieldErrors;
    return Object.entries(fieldErrors).reduce((acc, [key, value]) => {
      if (value?.length) {
        acc[key] = value[0];
      }
      return acc;
    }, {})
  }
  
}