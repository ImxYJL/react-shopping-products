import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalLayout, GlobalStyle } from "./styles/GlobalStyle.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <GlobalStyle />
    <GlobalLayout>
      <App />
    </GlobalLayout>
  </>
);
