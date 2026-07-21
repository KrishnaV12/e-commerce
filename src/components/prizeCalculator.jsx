export const calculateSalePrice = (product) => {
  if (!product.sale) return product.price;

  const discountRates = {
    'Books': 0.10,
    'Clothing': 0.20,
    'Home': 0.05 
  };

  const discount = discountRates[product.category] || 0;
  return (product.price * (1 - discount)).toFixed(2);
};