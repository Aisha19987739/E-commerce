import { Box, Container, TextField, Typography } from "@mui/material";
import { UseCart } from "../context/Auth/Cart/CartContext";
import Button from "@mui/material/Button";
import { useRef } from "react";


const CheckoutPage = () => {
  const { cartItems, totalAmount } = UseCart();
  const addressRef = useRef<HTMLInputElement>(null);

  const renderCartItem = () => (
    <Box display={"flex"} flexDirection={"column"} gap={2}
    sx={{
      border: 1,
      borderColor: "#f2f2f2",
      borderRadius: 5,
      padding: 1,
    }}
    >
      {cartItems.map((item) => (
        <Box
        display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          
         
          
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1}
            width="100%"
          >
            <img src={item.image} width={50} />
            <Box  
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            >
              <Typography variant="h6">{item.title}</Typography>

              <Typography>
                {item.quantity} x {item.unitPrice} $
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      
        <Typography variant="body2" textAlign="right">Total Amount : {totalAmount.toFixed(2)} $</Typography>
      </Box>
   
  );

  return (
    <>
      <Container fixed sx={{ mt: 10, display:"flex", flexDirection:"column",gap:1}}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Typography variant="h4" >Checkout</Typography>
        </Box>
        <TextField inputRef={addressRef} name="address" fullWidth label="Delivery Address"/>

        {renderCartItem()}
        <Button variant="contained" fullWidth >PAY NOW</Button>
      </Container>
    </>
  );
};
export default CheckoutPage;
