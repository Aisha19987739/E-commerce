import  userModel  from "../models/userModel";
import jwt from 'jsonwebtoken';

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
    return { data: "User already exists!", statusCode:400 };
  }
  
  const newUser = new userModel({ firstName, lastName, email, password });
  await newUser.save();
  return {data: generatejwt({firstName,lastName,email}), statusCode:200 };
};
interface loginParams {
  password: string;
  email: string;
}
export const login = async ({ email, password }: loginParams) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "Incorect Password or Email !", statusCode:400 };
  }
  const passwordMatch = password === findUser.password;
  if (passwordMatch) {
    return { data:generatejwt({email,firstName:findUser.firstName , lastName: findUser.lastName,}), statusCode:200 };
  }
  return { data: "Incorect Password or Email !", statusCode:400 };
};
const generatejwt=((data:any)=>{
  return jwt.sign(data, process.env.JWT_SECRET || '');
})
