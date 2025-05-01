import { createContext, useContext } from "react";
import { CartItem } from "../../../types/CartItem";

 interface CartContextType{
    cartItmes:CartItem[],
    totalAmount:number,
    addItemToCart:(productId:string) => void

    

}
export const CartContext = createContext<CartContextType>({
cartItmes:[],
totalAmount:0,
addItemToCart:()=>{}

  
  
});
export const UseCart = () => useContext(CartContext);
