export const formatPrice = (value: number | string): string => {
  const formatter = new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS'}).format;
  try {
    if (typeof value === 'string') {
      return formatter(parseFloat(value));
    }
    return formatter(value);
  } catch (error) {
    console.log(error);
    return formatter(0);
  }
};
