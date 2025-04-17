import express, { Response } from "express";
import { ExtendsRequest } from "../types/ExtendsRequest";
import validateJwt from "../middleWare/validateJWT";
import { addItemToCart, updateItemIncart, getActivCartForUser, deletItemIncart,clearCart } from "../services/cartService";
import { ExitStatus } from "typescript";


const router = express.Router();

router.get("/", validateJwt, async (req: ExtendsRequest, res: Response) => {
  const userId = req.user?._id;
  const cart = await getActivCartForUser({ userId });
  res.status(200).send(cart);
});

router.post("/items", validateJwt, async (req: ExtendsRequest, res) => {
  const userId = req?.user?._id;
  const { productId, quantity } = req.body;
  const response = await addItemToCart({ userId, productId, quantity });
  res.status(response.statusCode!).send(response.data);
});

router.put("/items", validateJwt, async (req: ExtendsRequest, res) => {
  

  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const response = await updateItemIncart({ userId, productId, quantity });
  res.status(response.statusCode!).send(response.data);
});
 router.delete("/items/:productId",validateJwt,async(req:ExtendsRequest,res)=>{
   const userId=req.user._id;
   const {productId}=req.params;
   const response = await deletItemIncart({userId,productId})
   res.status( response.statusCode!).send(response.data);


 });
 router.delete("",validateJwt,async(req:ExtendsRequest,res)=>{
  const userId=req.user._id;
  const response = await clearCart({userId})
 res.status( response.statusCode).send(response.data);
 }
 )

export default router;
