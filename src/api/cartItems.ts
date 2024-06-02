import { API_URL } from "../constants/url";
import { cartClient } from "./cartClient";
import { Product } from "./products";

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export const getCartItems = async () => {
  const cartItems = await cartClient.get<{ content: CartItem[] }>(
    API_URL.cartItems
  );
  return {
    data: cartItems.content,
  };
};

export const addCartItem = async (productId: number, quantity: number) => {
  await cartClient.post(API_URL.cartItems, { productId, quantity });
};

export const deleteCartItem = async (cartItemId: number) => {
  await cartClient.delete(`${API_URL.cartItems}/${cartItemId}`);
};
