import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { buyPotion } from "../store/products/shoppingSlice";
import { ProductResponse } from "../models/products.models";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const dispatch = useDispatch();
  const { gems, purchasedPotions } = useSelector(
    (state: RootState) => state.shopping
  );

  const handleBuy = async (productId: number, precio: number) => {
    if (gems >= precio && !purchasedPotions.includes(productId)) {
      const itemsId = [productId];
      try {
        const response = await fetch("http://localhost:3001/compras", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemsId }),
        });
        if (!response.ok) {
          throw new Error("Error al realizar la compra.");
        }
        dispatch(buyPotion(productId) as any);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return {
    products,
    gems,
    purchasedPotions,
    handleBuy,
  };
};
