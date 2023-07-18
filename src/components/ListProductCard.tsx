import React from "react";
import { ProductResponse } from "../models/products.models";

interface Props {
  product: ProductResponse;
  gems: number;
  purchasedPotions: number[];
  handleBuy: (id: number, precio: number) => void;
}

export const ListProductCard = React.memo(
  ({ product, gems, purchasedPotions, handleBuy }: Props) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 p-4">
        <div className="flex justify-between h-full flex-col">
          <div>
            <div className="flex justify-end">
              <div className="bg-green-600 text-white font-bold px-4 mb-2 rounded-full">
                {`${product.precio} ${product.precio > 1 ? "Gemas" : "Gema"}`}
              </div>
            </div>
            <img
              src={`./Icon${product.id}.png`}
              alt={product.nombre}
              className="d-block mx-auto w-1/3"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-base mb-2 text-white">
                {product.nombre}
              </div>
              <p className="text-gray-500 text-sm">{product.descripcion}</p>
            </div>
          </div>
          <button
            className={`bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded ${
              purchasedPotions.includes(product.id) || gems < product.precio
                ? "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
                : ""
            }`}
            onClick={() => handleBuy(product.id, product.precio)}
            disabled={
              purchasedPotions.includes(product.id) || gems < product.precio
            }
            data-testid={`add-button-${product.id}`}
          >
            Agregar
          </button>
        </div>
      </div>
    );
  }
);
