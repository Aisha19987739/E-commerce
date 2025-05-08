import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {  OrderModel } from "../models/OrderModel";

dotenv.config();


interface registerParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: registerParams) => {
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    return { data: "User already exists!", statusCode: 400 };
  }
  const hashedPassword = await bcrypt.hash(password,10);
  const newUser = new userModel({ email, password:hashedPassword,firstName,lastName  });
  await newUser.save();
  return { data:  generatejwt({firstName,lastName,email}) , statusCode: 200 };

  
};
interface loginParams {
  password: string;
  email: string;
}
export const login = async ({ email, password }: loginParams) => {
  try {
    console.log("🔍 البحث عن المستخدم بالبريد:", email);
    const findUser = await userModel.findOne({ email });
    console.log("👤 المستخدم:", findUser);

    if (!findUser) {
      return { data: "Incorrect Email or Password!", statusCode: 400 };
    }

    console.log("🔐 مقارنة كلمة المرور...");
    console.log("↪️ كلمة المرور المُخزنة:", findUser.password);
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    console.log("✅ نتيجة المطابقة:", passwordMatch);

    if (passwordMatch) {
      console.log("🔑 إنشاء توكن...");
      console.log("🔐 JWT_SECRET موجود؟", !!process.env.JWT_SECRET);

      const token = generatejwt({
        email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
      });
      return { data: token, statusCode: 200 };
    }

    return { data: "Incorrect Email or Password!", statusCode: 400 };
  } catch (err) {
    console.error("❌ خطأ غير متوقع في login():", err);
    throw err;
  }
};
interface GetMyOrdersParams{
  userId:string
}
export const getMyOrders=async({userId}:GetMyOrdersParams)=>{
  try{
    return{data:await OrderModel.find({userId}),stausCode:200} 
  }
  catch(err){
    throw err;
  }
  

}


//  export const login = async ({ email, password }: loginParams) => {
//   const findUser = await userModel.findOne({ email });
//   if (!findUser) {
//     return { data: "Incorrect Email or Password!", statusCode: 400 };
//   }
//   const passwordMatch = await bcrypt.compare(password, findUser.password);
//   if (passwordMatch) {
//     return { data:
//       generatejwt({email,firstName:findUser.firstName,lastName:findUser.lastName}) , statusCode: 200 };
//   }
//   return { data: "Incorrect Email or Password!", statusCode: 400 };
// };
const generatejwt = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || "", { expiresIn: '24h' });
};
