import { createContext, useContext } from "react";

interface AuthContextType {
  userName: string | null;
  token: string | null;
  
  login: (userName: string, token: string) => void;
  isAuthentcated: boolean;
  logout:()=>void
 
  
}
export const AuthContext = createContext<AuthContextType>({
  userName: null,
  token: null,
  isAuthentcated: false,
  login: () => {},
  logout:()=>{}
  
});
export const UseAuth = () => useContext(AuthContext);
