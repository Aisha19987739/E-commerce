
import { NextFunction,Response} from "express";
import { Request } from "express";
import jwt from "jsonwebtoken";
import  userModel  from "../models/userModel";
import { ExtendsRequest } from "../types/ExtendsRequest";

const validateJwt = (req:ExtendsRequest , res:Response , next:NextFunction)=>{
   

    const authorizationHeader=req.get('authorization');
    if(!authorizationHeader)
        {
            res.status(403).send("authorizationHeader was not provided");
             return;
    }
    const token=authorizationHeader.split(" ")[1];
    if(!token){
        res.status(403).send("Bearer token not found");
        return;
    }
    

    jwt.verify (token,process.env.JWT_SECRET || '',async(err,payload)=>{
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
    if (!user) {
        return res.status(404).json({ message: "User not found" });}
    req.user= user;

    next();
});
};
export default validateJwt;