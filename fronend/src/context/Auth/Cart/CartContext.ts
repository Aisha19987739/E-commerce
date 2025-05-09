import { createContext, useContext } from "react";
import { CartItem } from "../../../types/CartItem";

export interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;

  addItemToCart: (productId: string) => void;
  updateItemInCart: (productId: string, quantity: number) => void;
  removItemInCart: (productId: string) => void;
  clearCart: () => void;
}
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,

  addItemToCart: () => {},
  updateItemInCart: () => {},
  removItemInCart: () => {},
  clearCart: () => {},
});
export const UseCart = () => useContext(CartContext);
