import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import HomePage from "./Pages/HomePage"
import RegisterPage from "./Pages/RegisterPage"
import AuthProvider from "./context/Auth/Auth/AuthProvider"
import LoginPage from "./Pages/LoginPage"
import CartPage from "./Pages/CartPage"
import ProtectedRoute from "./Components/ProtectedRoute"
import CartProvider from "./context/Auth/Cart/CartProvider"
import CheckoutPage from "./Pages/CheckoutPage"
import OrderSuccessPage from "./Pages/OrderSuccessPage"
import MyOrdersPage from "./Pages/MyOrdersPage"





function App() {
 

  return (
    <AuthProvider>
      <CartProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/login" element={<LoginPage/>}/> 
    <Route element={<ProtectedRoute/>}>
    <Route path="/cart" element={<CartPage/>}/>
    <Route path="/checkout" element={<CheckoutPage/>}/>
    <Route path="/order-success" element={<OrderSuccessPage/>}/>
    <Route path="/my-orders" element={<MyOrdersPage/>}/>
    </Route>
 
    
    
    </Routes>
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
   
  )
}

export default App
