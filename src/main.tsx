import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalLayout, GlobalStyle } from "./styles/GlobalStyle.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryErrorBoundary from "./components/Error/QueryErrorBoundary.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <QueryErrorBoundary>
        <GlobalStyle />
        <GlobalLayout>
          <App />
        </GlobalLayout>
      </QueryErrorBoundary>
    </QueryClientProvider>
  </>
);
