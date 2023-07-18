import { ProductResponse } from "../models/products.models";

export const getProductPrice = async (productId: number): Promise<number> => {
  const response = await fetch(`http://localhost:3001/productos/${productId}`);
  if (!response.ok) {
    throw new Error("Error al obtener el precio del producto.");
  }
  const product: ProductResponse = await response.json();
  return product.precio;
};
