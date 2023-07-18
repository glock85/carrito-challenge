import React from "react";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { ListProductCard } from "./ListProductCard";

export const ListProductsComponent = React.memo(() => {
  const { products, gems, purchasedPotions, handleBuy } =
    useFetchProducts();
  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ListProductCard
          key={product.id}
          product={product}
          gems={gems}
          purchasedPotions={purchasedPotions}
          handleBuy={handleBuy}
        />
      ))}
    </div>
  );
});
