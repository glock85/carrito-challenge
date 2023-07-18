/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
// @ts-ignore
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { store } from "../../src/store/store";
import App from "../../src/App";
import fetchMock from "jest-fetch-mock";

describe("App", () => {
  const setup = () => {
    return render(
      <Provider store={{ ...store }}>
        <App />
      </Provider>
    );
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should show ListProductsComponent by default", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    const { getByTestId } = setup();

    const listProductsComponent = getByTestId("list-product-card");

    expect(listProductsComponent).toBeInTheDocument();
  });

  it("should show CartComponent when clicking on the cart button", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    const { getByTestId, findByTestId } = setup();

    const cartButton = getByTestId("cart-button");

    act(() => {
      fireEvent.click(cartButton);
    });

    const cartComponent = await findByTestId("cart-component");

    expect(cartComponent).toBeInTheDocument();
  });

  it("should show ListProductsComponent when clicking on the back button in CartComponent", () => {
    const { getByTestId } = setup();

    const cartButton = getByTestId("cart-button");

    act(() => {
      fireEvent.click(cartButton);
    });

    const backButton = getByTestId("back-button");

    act(() => {
      fireEvent.click(backButton);
    });

    const listProductsComponent = getByTestId("list-product-card");

    expect(listProductsComponent).toBeInTheDocument();
  });

  it("should add a product to the cart when clicking on 'Agregar' button", async () => {
    const mockProduct = { id: 1, nombre: "HP 500", precio: 1 };
    const { findByTestId, getByTestId } = setup();

    const addButton = await findByTestId(`add-button-${mockProduct.id}`);

    act(() => {
      fireEvent.click(addButton);
    });

    const cartButton = getByTestId("cart-button");

    await waitFor(() =>
      expect(cartButton).toHaveTextContent("Ver Carrito (1)")
    );
  });
  it("should render the correct number of products in CartComponent and delete a product when clicking on 'X' button", async () => {
    const mockProduct1 = { id: 1, nombre: "HP 500", precio: 1 };
    const mockProduct2 = { id: 2, nombre: "Veneno somnoliento", precio: 1 };

    const { findByTestId, getByTestId } = setup();

    // Agregar dos productos al carrito
    const addButton1 = await findByTestId(`add-button-${mockProduct1.id}`);
    const addButton2 = await findByTestId(`add-button-${mockProduct2.id}`);

    act(() => {
      fireEvent.click(addButton1);
      fireEvent.click(addButton2);
    });

    const cartButton = getByTestId("cart-button");

    act(() => {
      fireEvent.click(cartButton);
    });

    await waitFor(() => {
      const cartComponent = getByTestId("cart-component");
      const cartProducts = cartComponent.querySelectorAll(
        '[data-testid^="list-cart-card"]'
      );

      expect(cartProducts.length).toBe(2);

      // Obtener el botón de eliminación para el primer producto y hacer clic en él
      const deleteButton1 = getByTestId(`delete-button-${mockProduct1.id}`);
      fireEvent.click(deleteButton1);
    });

    // Verificar que el producto eliminado ya no se encuentre en el componente CartComponent
    await waitFor(() => {
      const cartComponent = getByTestId("cart-component");
      const cartProducts = cartComponent.querySelectorAll(
        '[data-testid^="list-cart-card"]'
      );

      expect(cartProducts.length).toBe(1);
    });
  });
});
