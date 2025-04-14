import express, { Response } from "express";
import { Request } from "express";
import router from "./userRoute";
import validataJwt from  "../middleWare/validateJWT";
import { getActivCartForUser } from "../services/cartService";
import { ExtendsRequest } from "../middleWare/validateJWT"; 
router.get('/',validataJwt,async(req :ExtendsRequest,res:Response)=>{
     const userId= req.user?._id;
    //TO DO GET:TOKEN KEY
   const cart=  await getActivCartForUser({userId});
   res.status(200).send(cart)

});
export default router;