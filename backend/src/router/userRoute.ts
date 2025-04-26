import {Router,request,response } from "express";
import express from "express";
import { login, register } from "../services/userservices";


const router=  express.Router();
router.post('/register', async (request,response)=>{
   
    try{
    const {firstName,lastName,email,password}=request.body;
    const {statusCode,data}= await register({firstName,lastName,email,password})
    response.status(statusCode).json(data);
    }
    catch{
    
       response.status(500).send("Something went worng!")
    }

});

//  router.post('/login', async (req:Request,res:Response)=>{
// //     try{
       
// //     const {email,password}=req.body;
   
// //     const {statusCode,data}= await login({email,password})
// //     res.status(statusCode).json(data);
// //     }
// //     catch(error){
// //         console.error("❌ Login error:", error);
// //         res.status(500).send("Something went worng!")
// //       }

//  })

router.post('/login', async (request,response) => { 
    console.log("📥 Login route hit"); // ← طباعة للتأكيد
  
    try {
      const { email, password } = request.body;
      console.log("📨 Request body:", { email, password }); // ← طباعة البيانات
  
      const { statusCode, data } = await login({ email, password });
  
      console.log("✅ Login response:", { statusCode, data }); // ← طباعة النتيجة
  
      response.status(statusCode).json(data);
    } catch (error) {
      console.error("❌ Login error in route:", error);
      response.status(500).json({ message: "Something went wrong!" });
    }
  });
  
export default router;