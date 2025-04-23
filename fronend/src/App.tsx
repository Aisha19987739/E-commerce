import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import HomePage from "./Pages/HomePage"
import RegisterPage from "./Pages/RegisterPage"

function App() {
 

  return (
    <BrowserRouter >
    <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    </Routes>


    
    </BrowserRouter>
   
  )
}

export default App
