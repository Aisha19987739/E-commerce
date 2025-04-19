import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"

function App() {
 

  return (
    <BrowserRouter >
    <Navbar/>
    <Routes>
    <Route path="/" element={<div>home Page</div>}/>
    <Route path="/login" element={<div>login Page</div>}/>
    </Routes>


    
    </BrowserRouter>
   
  )
}

export default App
