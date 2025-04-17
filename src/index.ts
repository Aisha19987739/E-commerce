import express from "express";
import mongoose from "mongoose";
import userRoute from "./router/userRoute";
import { seedinitialProducts } from "./services/productService";
import productRoute from "./router/productRoute";
import cartRouter from "./router/cartRouter";



const app = express();
const port = 3001;
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("Connectted !");
  })
  .catch((err) => {
    console.log("faield connection :", err);
  });

seedinitialProducts();

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRouter);


app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
