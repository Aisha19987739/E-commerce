import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import HomePage from "./Pages/HomePage"
import RegisterPage from "./Pages/RegisterPage"
import AuthProvider from "./context/Auth/AuthProvider"
import LoginPage from "./Pages/LoginPage"





function App() {
 

  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    
    </Routes>
    </BrowserRouter>
    </AuthProvider>
   
  )
}

export default App
