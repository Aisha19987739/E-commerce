import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
 

  return (
    <BrowserRouter> 
    <Routes>
    <Route path="/" element={<div>home Page</div>}/>
    <Route path="/login" element={<div>login Page</div>}/>
    </Routes>


    
    </BrowserRouter>
   
  )
}

export default App
