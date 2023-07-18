import { useState } from "react";
import { HeaderComponent } from "./components/HeaderComponent";
import { CartComponent, ListProductsComponent } from "./components";

function App() {
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div
      className="min-h-full bg-fixed"
      style={{ backgroundImage: "url(background.webp)" }}
    >
      <HeaderComponent handleShowCart={handleShowCart} />
      <div className="flex justify-center min-h-full">
        <div className="max-w-lg w-full py-16">
          {showCart ? (
            <div data-testid="cart-component">
              <CartComponent handleShowCart={handleShowCart} />
            </div>
          ) : (
            <div data-testid="list-product-card">
              <ListProductsComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
