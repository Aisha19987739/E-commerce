
import { NextFunction,Response} from "express";
import { Request } from "express";
import jwt from "jsonwebtoken";
import  userModel  from "../models/userModel";
export interface ExtendsRequest extends Request {
    user?: any;
  }
  
const validateJwt = (req:ExtendsRequest , res:Response , next:NextFunction)=>{

    const authorizationHeader=req.get('authorization');
    if(!authorizationHeader)
        {
            res.status(403).send("authorizationHeader was not provided");
             return;
    }
    const token=authorizationHeader.split(" ")[1];
    if(!token){
        res.status(403).send("Barrer token not found");
        return;
    } 

    jwt.verify (token,"WlRvM3kZ3A",async(err,payload)=>{
    if(err){
        res.status(403).send("Invalid token");
        return;
    }
    const userPayload = payload as{
        email: String;
        firstName: String;
        lastName: String;
    };
    //fetch user  from database based on the bayload
    const user = await userModel.findOne({email:userPayload.email});
    req.user= user;
    next();
});
};
export default validateJwt;