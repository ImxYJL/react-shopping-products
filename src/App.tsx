import ProductList from "./components/ProductList";
import { CartItemsProvider } from "./store/cartItems";

function App() {
  return (
    <>
      <CartItemsProvider>
        <ProductList />
      </CartItemsProvider>
    </>
  );
}

export default App;
