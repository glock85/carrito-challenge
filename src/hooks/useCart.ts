import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deletePotion, reset } from "../store/products/shoppingSlice";
import { ProductResponse } from "../models/products.models";

export const useCart = () => {
  const dispatch = useDispatch();
  const purchasedPotions = useSelector(
    (state: RootState) => state.shopping.purchasedPotions
  );
  const [buyProducts, setBuyProducts] = useState(false);
  const [potionPurchased, setPotionPurchased] = useState<ProductResponse[]>([]);

  const handleDeletePotion = (productId: number) => {
    dispatch(deletePotion(productId) as any);
  };

  const handleResetCart = () => {
    setBuyProducts(true);
    dispatch(reset());
  };

  useEffect(() => {
    const getPurchasePotions = async () => {
      const fetchPromises = purchasedPotions.map((productId) =>
        fetch(`http://localhost:3001/productos/${productId}`).then((res) =>
          res.json()
        )
      );

      const products = await Promise.all(fetchPromises);
      setPotionPurchased(products);
    };

    getPurchasePotions();
  }, [purchasedPotions]);

  return {
    buyProducts,
    potionPurchased,
    handleDeletePotion,
    handleResetCart,
    purchasedPotions,
  };
};
