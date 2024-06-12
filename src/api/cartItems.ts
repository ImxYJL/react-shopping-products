import { API_URL } from "../constants/url";
import { cartClient } from "./cartClient";
import { Product } from "./products";
export interface ICartItem {
  id: number;
  quantity: number;
  product: Product;
}

export const getCartItems = async () => {
  const cartItems = await cartClient.get<{ content: ICartItem[] }>(
    API_URL.cartItems
  );

  return {
    data: cartItems.content,
  };
};

export interface addCartItemProps {
  productId: number;
  quantity: number;
}

export const addCartItem = async ({
  productId,
  quantity,
}: addCartItemProps) => {
  await cartClient.post(API_URL.cartItems, { productId, quantity });
};

export const deleteCartItem = async (cartItemId: number) => {
  await cartClient.delete(`${API_URL.cartItems}/${cartItemId}`);
};

export interface patchCartItemQuantityProps {
  cartItemId: number;
  quantity: number;
}

export const patchCartItemQuantity = async ({
  cartItemId,
  quantity,
}: patchCartItemQuantityProps) => {
  await cartClient.patch(`${API_URL.cartItems}/${cartItemId}`, { quantity });
};
