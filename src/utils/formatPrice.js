export const formatPrice = (value) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return value;
  }

  return `${value} TL`;
};
