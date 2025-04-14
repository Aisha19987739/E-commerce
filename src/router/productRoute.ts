import express from "express";
import { getallProduct } from "../services/productService";
const router = express.Router();
router.get("/", async (req, res) => {
  const product = await getallProduct();
  res.status(200).send(product);
});
export default router;
