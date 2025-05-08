import { FC, PropsWithChildren, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../../types/CartItem";
import { BASE_URl } from "../../../constant/baseUrl";
import { UseAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = UseAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState(" ");
  const [myOrders,setmyOrders]=useState();
  useEffect(() => {
    if (!token) {
      console.warn("Token is not ready yet, skipping fetch.");
      return;
    }
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URl}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const text = await response.text();
        setError(`Server error: ${text}`);
        console.error("Fetch /cart failed:", text);

        return;
      }
      const cart = await response.json();

      const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );




      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    };
    fetchCart();
  }, [token]);

  const addItemToCart = async (productId: string) => {
    try {
      const existingItem = cartItems.find(
        (item) => item.productId === productId
      );
  
      if (existingItem) {
        // المنتج موجود بالفعل، نزيد الكمية بدل الإضافة
        await updateItemInCart(productId, existingItem.quantity + 1);
        return;
      }
  
      // المنتج غير موجود، نضيفه
      const response = await fetch(`${BASE_URl}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });
  
      if (!response.ok) {
        setError("Failed to add to cart");
        return;
      }
  
      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse cart data");
        return;
      }
  
      const cartItemMapped = cart.items.map(
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.unitPrice,
        })
      );
  
      setCartItems(cartItemMapped);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateItemInCart = async (productId: string, quantity: number) => {
   

    try {
      const response = await fetch(`${BASE_URl}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: productId, quantity: quantity }),
      });

      if (!response.ok) {
        setError("Failed to update to cart");
      }
      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse cart data");
      }


       const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };
  const removItemInCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URl}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
       
      });

      if (!response.ok) {
        setError("Failed to Delete to cart");
      }
      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse cart data");
      }


       const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };
  const clearCart = async () => {
    try {
      const response = await fetch(`${BASE_URl}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
       
      });

      if (!response.ok) {
        setError("Failed to empty to cart");
      }
      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse cart data");
      }
      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error(error);
    }
  };
 

  

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        updateItemInCart,
        removItemInCart,
        clearCart,
       
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
