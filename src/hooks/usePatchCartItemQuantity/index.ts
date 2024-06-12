import { patchCartItemQuantity } from "../../api/cartItems";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/queryKeys";
import { useToast } from "../../stores/ToastProvider";

const usePatchCartItemQuantity = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
    },
    onError: (error) => {
      showToast(
        error.message || "아이템의 수량을 변경하는 도중 에러가 발생했습니다."
      );
    },
  });
};

export default usePatchCartItemQuantity;
