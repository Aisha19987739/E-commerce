import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URl } from "../constant/baseUrl";
import { UseAuth}  from "../context/Auth/Auth/AuthContext";
import { UseCart } from "../context/Auth/Cart/CartContext";

const CartPage=()=>{ 
   // const { token,initialized } = UseAuth();
    
    const{cartItems,totalAmount}=UseCart(); 
    const [error,setError]=useState(' ');
  

   
   
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