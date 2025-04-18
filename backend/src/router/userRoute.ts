import { request, response, Router,Request,Response } from "express";
import express from "express";
import { login, register } from "../services/userservices";

const router=  express.Router();
router.post('/register', async (req:Request,res:Response)=>{
    try{
    const {firstName,lastName,email,password}=req.body;
    const {statusCode,data}= await register({firstName,lastName,email,password})
    res.status(statusCode).send(data);
    }
    catch{
    
       res.status(500).send("Something went worng!")
    }

});
router.post('/login', async (req:Request,res:Response)=>{
    try{
    const {email,password}=request.body;
    const {statusCode,data}= await login({email,password})
    res.status(statusCode).send(data);
    }
    catch{
        res.status(500).send("Something went worng!")
      }

})

export default router;