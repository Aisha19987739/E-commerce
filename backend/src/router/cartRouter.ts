import express, { Response } from "express";
import { ExtendsRequest } from "../types/ExtendsRequest";
import validateJwt from "../middleWare/validateJWT";
import { addItemToCart, getActivCartForUser, deletItemIncart,clearCart, checkout, updateItemInCart } from "../services/cartService";
import { ExitStatus } from "typescript";


const router = express.Router();

router.get("/", validateJwt, async (req: ExtendsRequest, res: Response) => {
  try{
    const userId = req.user?._id;
    const cart = await getActivCartForUser({ userId,populateProduct:true });
    res.status(200).send(cart);

  }
  catch{
    res.status(500).send("Something went worng!")
  }
 
});

router.post("/items", validateJwt, async (req: ExtendsRequest, res) => {
  try{
    const userId = req?.user?._id;
  const { productId, quantity } = req.body;
  const response = await addItemToCart({ userId, productId, quantity });
  res.status(response.statusCode!).send(response.data);
  }
  catch{
    res.status(500).send("Something went worng!")
  }
  
});

router.put("/items", validateJwt, async (req: ExtendsRequest, res) => {
 
  
try{
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  
  const response = await updateItemInCart({ userId, productId, quantity });
  res.status(response.statusCode!).send(response.data);
}
  catch{
    res.status(500).send("Something went worng!")
  }
});
 router.delete("/items/:productId",validateJwt,async(req:ExtendsRequest,res)=>{
  try{
   const userId=req.user._id;
   const {productId}=req.params;
   const response = await deletItemIncart({userId,productId})
   res.status( response.statusCode!).send(response.data);
  }
   catch{
    res.status(500).send("Something went worng!")
  }


 });
 
 router.delete("/",validateJwt,async(req:ExtendsRequest,res)=>{
  try{
  const userId=req.user._id;
  const response = await clearCart({userId})
 res.status( response.statusCode).send(response.data);
  }
 catch{
  res.status(500).send("Something went worng!")
}
 }
 );
 router.post("/checkout",validateJwt,async(req:ExtendsRequest,res)=>{
  try{
  const userId=req.user._id;
  const {address}=req.body;
  const response = await checkout({userId,address})
  res.status( response.statusCode).send(response.data);
  }
  catch{
    res.status(500).send("Something went worng!")
  }
 })

export default router;
