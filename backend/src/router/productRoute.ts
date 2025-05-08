import express from "express";
import { getallProduct } from "../services/productService";
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const product = await getallProduct();
    res.status(200).send(product);
  } catch {
    res.status(500).send("Something went worng!");
  }
});
export default router;
