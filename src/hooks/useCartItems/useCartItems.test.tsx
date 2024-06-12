import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCartItems from "./index";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useCartItems", () => {
  it("장바구니에 존재하는 상품을 불러올 수 있다.", async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toEqual(false));

    expect(result.current.cartItems.length).toBeGreaterThan(0);
  });
});
