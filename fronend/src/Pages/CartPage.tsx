import { Box, Container, Typography } from "@mui/material";
import { UseCart } from "../context/Auth/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const CartPage = () => {
 

  const { cartItems, totalAmount, updateItemInCart ,removItemInCart} = UseCart();
  
  const handleQuantity = (productId: string , quantity: number) => {
   
    updateItemInCart(productId , quantity );
  };
    const hadleRemveItem=(productId:string)=>{
      removItemInCart(productId)

    }

 
  return (
    <>
      <Container fixed sx={{ mt: 10 }}>
        <Box display={"flex"} flexDirection={"column"} gap={4}>
          <Typography variant="h4">my Cart</Typography>
          {cartItems.map((item) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: 1,
                borderColor: "#f2f2f2",
                borderRadius: 5,
                padding: 1,
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={1}
              >
                <img src={item.image} width={50} />
                <Box>
                  <Typography variant="h6">{item.title}</Typography> 
                  
                  <Typography>
                    {item.quantity} x {item.unitPrice} $
                  </Typography>
                  <Button onClick={()=>hadleRemveItem(item.productId)}>Remove Item</Button>
                </Box>
              </Box>

              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button
                  onClick={() =>
                    

                    handleQuantity(item.productId, item.quantity -1)
                  }
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleQuantity(item.productId, item.quantity +1)
                    
                  }
                >
                  +
                </Button>
              </ButtonGroup>
            </Box>
          ))}
          <Box>
            <Typography>Total Amount : {totalAmount.toFixed(2)} EGP</Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default CartPage;
