import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
const USER_NAME='userName';
const TOKEN_KEY='token'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userName, setuserName] = useState<string | null>(
    localStorage.getItem( USER_NAME)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  const isAuthentcated = !!token;

  const login = (userName: string, token: string) => {
    setuserName(userName);
    setToken(token);
    localStorage.setItem(USER_NAME, userName);
    localStorage.setItem(TOKEN_KEY, token);
  };
  const logout =()=>{
    localStorage.removeItem(USER_NAME)
    localStorage.removeItem(TOKEN_KEY)
    setuserName(null)
    setToken(null)
  }
  
  return (
    <AuthContext.Provider value={{ userName, token,isAuthentcated, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
