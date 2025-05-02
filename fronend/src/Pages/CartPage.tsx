import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URl } from "../constant/baseUrl";
import { UseAuth}  from "../context/Auth/Auth/AuthContext";
import { UseCart } from "../context/Auth/Cart/CartContext";

const CartPage=()=>{ 
   // const { token,initialized } = UseAuth();
    
    const{cartItems,totalAmount}=UseCart(); 
    const [error,setError]=useState(' ');
  

    // useEffect(()=>{ 
        
    //     if(!initialized)
    //     {
    //         console.log("Login");
    //     }
      
        
    //     if (!token) {
    //         console.warn("Token is not ready yet, skipping fetch.");
    //         return;
    //       }
    //     const fetchCart = async() =>{
    //         const response = await fetch(`${BASE_URl}/cart`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //               }
                  
    //           });
    //            if (!response.ok) {
    //                 const text = await response.text();
    //                 setError(`Server error: ${text}`);
    //                 console.error("Fetch /cart failed:", text);

    //                 return;
    //               }
                  
            
           

    //     };
    //     fetchCart();

    // },[token,initialized])
   
    return (
        <>
         <Container sx={{mt:10}}>
            <Typography variant="h4">my Cart</Typography>
            {cartItems.map((item)=>(
                <Box>{item.title}</Box>
            ))}
            
         </Container>
        </>
    )
}
export default CartPage;