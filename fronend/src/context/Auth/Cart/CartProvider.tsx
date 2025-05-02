import { FC, PropsWithChildren, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import  {CartItem } from "../../../types/CartItem";
import { BASE_URl } from "../../../constant/baseUrl";
import { Title } from "@mui/icons-material";
import { UseAuth } from "../Auth/AuthContext";



const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const {token}=UseAuth()
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error,setError]=useState(' ')
  const addItemToCart= async(productId:string)=>{
    try{
      const response= await fetch(`${BASE_URl}/cart/items`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
          productId,
          quantity:1
  
        }),
      });
      if(!response.ok)
      {
        setError("Failed to add to cart");

      }
      const cart = await response.json();
      if(!cart){setError("Failed to parse cart data")}
      const cartItemsMapped = cart.items.map(({ product, quantity }: { product: any; quantity: number }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice: product.unitPrice,
      }));
      
      setCartItems([...cart.items]);
      setTotalAmount(cart.totalAmount)
    }
    catch(error)
{
  console.error(error)
}   
   
  };
  
   


  return (
    <CartContext.Provider value={{ cartItems ,totalAmount,addItemToCart}}>
        {children}

    </CartContext.Provider>
    
    
  );
};

export default CartProvider;
