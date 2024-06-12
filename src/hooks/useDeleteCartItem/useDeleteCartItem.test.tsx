import useDeleteCartItem from ".";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useAddCartItem", () => {
  it("선택한 상품을 장바구니에서 삭제하는 요청에서 상품의 id를 명시한대로 보낼 수 있다.", async () => {
    const cartItemIdToDelete = 123;
    const { result } = renderHook(() => useDeleteCartItem(), { wrapper });

    act(() => {
      result.current.mutate(cartItemIdToDelete);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.error).toBeFalsy();
    expect(result.current.variables).toEqual(cartItemIdToDelete);
  });
});
