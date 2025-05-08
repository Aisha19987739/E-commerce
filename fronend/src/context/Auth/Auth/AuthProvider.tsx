import { FC, PropsWithChildren, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URl } from "../../../constant/baseUrl";

const USER_NAME = 'userName';
const TOKEN_KEY = 'token';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userName, setuserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [myOrders,setmyOrders]=useState([]);
  


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
   const getMyOrders =async()=>{
      const response = await fetch(`${BASE_URl}/user/my-orders`, {
        method: "GET",
        headers: {
         
          Authorization: `Bearer ${token}`,
        },
     
      });
      if (!response.ok)
        
          return;
         
      const data = await response.json();
      setmyOrders(data)
      
  
    }

  
 


  return (
    <AuthContext.Provider value={{ userName, token, isAuthentcated, login, logout, initialized, getMyOrders,
      myOrders }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
