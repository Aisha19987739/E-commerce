import Container from "@mui/material/Container";
import { UseAuth } from "../context/Auth/Auth/AuthContext";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

const MyOrdersPage = () => {
  const { getMyOrders, myOrders } = UseAuth();

  useEffect(() => {
    getMyOrders();
  }, []);
  console.log(myOrders);

  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      {Array.isArray(myOrders) &&
        myOrders.map(({ _id, address, total, orderItem }: any) => (
          <Box
            key={_id}
            sx={{ border: 1, borderColor: "gray", borderRadius: 2, padding: 1 }}
          >
            <Typography>id: {_id}</Typography>
            <Typography>address: {address}</Typography>
            <Typography>total: {total}</Typography>
            <Typography>Items: {orderItem.length}</Typography>
          </Box>
        ))}
    </Container>
  );
};

export default MyOrdersPage;
