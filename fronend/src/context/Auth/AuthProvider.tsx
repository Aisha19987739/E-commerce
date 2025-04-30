import { FC, PropsWithChildren, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const USER_NAME = 'userName';
const TOKEN_KEY = 'token';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userName, setuserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // تحقق من بيانات المستخدم من localStorage عند تحميل الصفحة
  useEffect(() => {
    const savedUserName = localStorage.getItem(USER_NAME);
    const savedToken = localStorage.getItem(TOKEN_KEY);

    if (savedUserName) setuserName(savedUserName);
    if (savedToken)  setToken(savedToken.replace(/"/g, ""));
    
    setInitialized(true);  // بعد تحميل البيانات
  }, []);

  const isAuthentcated = !!token;

  const login = (userName: string, token: string) => {
    setuserName(userName);
    setToken(token.replace(/"/g, ""));
  
    localStorage.setItem(USER_NAME, userName);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    localStorage.removeItem(USER_NAME);
    localStorage.removeItem(TOKEN_KEY);
    setuserName(null);
    setToken(null);
  };
 


  return (
    <AuthContext.Provider value={{ userName, token, isAuthentcated, login, logout, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
