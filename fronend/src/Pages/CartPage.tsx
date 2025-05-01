import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URl } from "../constant/baseUrl";
import { UseAuth}  from "../context/Auth/Auth/AuthContext";

const CartPage=()=>{ 
    const { token,initialized } = UseAuth();
    
    const [cart,setCart]=useState();
    const [error,setError]=useState(' ');
  
console.log({token});
    useEffect(()=>{ 
        
        if(!initialized)
        {
            console.log("Login");
        }
      
        
        if (!token) {
            console.warn("Token is not ready yet, skipping fetch.");
            return;
          }
        const fetchCart = async() =>{
            const response = await fetch(`${BASE_URl}/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
                  
              });
               if (!response.ok) {
                    const text = await response.text();
                    setError(`Server error: ${text}`);
                    console.error("Fetch /cart failed:", text);

                    return;
                  }
                  
            
            const data = await response.json();
            setCart(data);


        };
        fetchCart();

    },[token,initialized])
    console.log({cart});
    return (
        <>
         <Container sx={{mt:10}}>
            <Typography variant="h4">my Cart</Typography>
            
         </Container>
        </>
    )
}
export default CartPage;