import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import HomePage from "./Pages/HomePage"

function App() {
 

  return (
    <BrowserRouter >
    <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<div>login Page</div>}/>
    </Routes>


    
    </BrowserRouter>
   
  )
}

export default App
