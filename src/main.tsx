import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalLayout, GlobalStyle } from "./styles/GlobalStyle.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryErrorBoundary from "./components/Error/QueryErrorBoundary.tsx";
import { ToastProvider } from "./stores/ToastProvider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
    mutations: {
      networkMode: "always",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <div style={{ fontSize: 20 }}>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
        </div>
        <QueryErrorBoundary>
          <GlobalStyle />
          <GlobalLayout>
            <App />
          </GlobalLayout>
        </QueryErrorBoundary>
      </ToastProvider>
    </QueryClientProvider>
  </>
);
