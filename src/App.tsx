import ProductList from "./components/ProductList";

import { useToast } from "./stores/ToastProvider";
import ErrorToast from "./components/ErrorToast.tsx";

function App() {
  const { isOpenToast } = useToast();

  return (
    <>
      {isOpenToast && <ErrorToast />}
      <ProductList />
    </>
  );
}

export default App;
