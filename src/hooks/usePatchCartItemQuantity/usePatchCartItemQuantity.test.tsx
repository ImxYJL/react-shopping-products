import usePatchCartItemQuantity from ".";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useAddCartItem", () => {
  it("장바구니에 담긴 아이템의 수량을 변경하는 요청에서 상품의 id와 quantity를 명시한대로 보낼 수 있다.", async () => {
    const cartItemIdToPatch = 123;
    const quantityToPatch = 3;
    const { result } = renderHook(() => usePatchCartItemQuantity(), {
      wrapper,
    });

    act(() => {
      result.current.mutate({
        cartItemId: cartItemIdToPatch,
        quantity: quantityToPatch,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.error).toBeFalsy();
    expect(result.current.variables).toEqual({
      cartItemId: cartItemIdToPatch,
      quantity: quantityToPatch,
    });
  });
});
