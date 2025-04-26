import { createContext, useContext } from "react"

 interface AuthContextType{
    userName:string|null,
    token:string|null,
    login : ( userName:string,token:string) =>void
    isAuthentcated:boolean;
}
export const AuthContext = createContext<AuthContextType >({userName:null,token:null,login:()=>{},isAuthentcated:false})
export const UseAuth = ()=>useContext(AuthContext);