import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./router/userRoute";
import { seedinitialProducts } from "./services/productService";
import productRoute from "./router/productRoute";
import cartRouter from "./router/cartRouter";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => {
    console.log("Connected !");
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
