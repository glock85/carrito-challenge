import React from "react";
import { ProductResponse } from "../models/products.models";

interface Props {
  product: ProductResponse;
  handleDeletePotion: (productId: number) => void;
}

export const ListCartCard = React.memo(
  ({ product, handleDeletePotion }: Props) => {
    return (
      <div
        className="rounded overflow-hidden shadow-lg bg-gray-800 p-4 flex flex-row justify-between items-center border-b-4 border-gray-600"
        data-testid={`list-cart-card-${product.id}`}
      >
        <div className="bg-gray-700 text-white font-bold rounded-full p-2">
          <img
            src={`./Icon${product.id}.png`}
            alt={product.nombre}
            className="d-block mx-auto w-1/1"
          />
        </div>
        <div className="font-bold text-base mb-2 text-white">
          {product.nombre}
        </div>
        <button
          onClick={() => handleDeletePotion(product.id)}
          className="text-gray-500 text-lg font-bold"
          data-testid={`delete-button-${product.id}`}
        >
          X
        </button>
      </div>
    );
  }
);
