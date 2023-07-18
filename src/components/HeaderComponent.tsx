/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { handleShowCart } from "../models/general.models";

export const HeaderComponent = React.memo(
  ({ handleShowCart }: handleShowCart) => {
    const gems = useSelector((state: RootState) => state.shopping.gems);
    const purchasedPotions = useSelector(
      (state: RootState) => state.shopping.purchasedPotions
    );
    return (
      <div className="bg-stone-700 py-4 px-8 flex justify-between items-center sticky top-0 shadow-md z-10">
        <h1 className="text-white text-2xl font-bold">🧙‍♂️ Potion Shop</h1>
        <div className="flex gap-2 items-center">
          <img src="./gem.png" alt="Gema" />
          <span>{gems > 1 ? `${gems} Gemas` : `${gems} Gema`}</span>
        </div>
        <button
          onClick={handleShowCart}
          className="text-white hover:underline"
          role="button"
          data-testid="cart-button"
        >
          Ver Carrito ({purchasedPotions.length})
        </button>
      </div>
    );
  }
);
