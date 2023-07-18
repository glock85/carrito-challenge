import React from "react";
import { useCart } from "../hooks/useCart";
import { handleShowCart } from "../models/general.models";
import { ListCartCard } from "./ListCartCard";

export const CartComponent = React.memo(
  ({ handleShowCart }: handleShowCart) => {
    const {
      buyProducts,
      potionPurchased,
      handleDeletePotion,
      handleResetCart,
      purchasedPotions,
    } = useCart();

    return (
      <div className="flex flex-col gap-8">
        <div>
          <button
            className="text-white font-bold bg-violet-700 hover:bg-violet-800 py-2 px-4 rounded"
            onClick={handleShowCart}
            data-testid="back-button"
          >
            Volver
          </button>
        </div>
        <div>
          {buyProducts && (
            <p className="text-white font-bold">Compra Realizada!</p>
          )}
          {potionPurchased.map((product) => (
            <ListCartCard
              key={product.id}
              product={product}
              handleDeletePotion={handleDeletePotion}
              data-testid={`list-cart-card-${product.id}`}
            />
          ))}
        </div>
        {purchasedPotions.length > 0 && (
          <button
            onClick={handleResetCart}
            className="text-white font-bold bg-violet-700 hover:bg-violet-800 py-2 px-4 rounded"
            data-testid="buy-button"
          >
            Comprar
          </button>
        )}
      </div>
    );
  }
);
