import express, {   Response } from "express";
import response from "express";
import { Request } from "express";
import router from "./userRoute";
import validateJwt from  "../middleWare/validateJWT";
import { getActivCartForUser } from "../services/cartService";
import { ExtendsRequest } from "../types/ExtendsRequest" 
import { addItemToCart } from "../services/cartService";
router.get('/',validateJwt,async(req :ExtendsRequest,res:Response)=>{
     const userId= req.user?._id;
    //TO DO GET:TOKEN KEY
   const cart=  await getActivCartForUser({userId});
   res.status(200).send(cart)

});
router.post('/items',validateJwt, async(req:ExtendsRequest,res)=>
{
   const userId=req?.user?._id;
   const {productId,quantity}=req.body;
  const response = await addItemToCart({userId,productId,quantity});
 res.status(response.statusCode!).send(response.data);
}
)
export default router;