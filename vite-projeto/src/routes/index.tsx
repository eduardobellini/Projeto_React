import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Contato from "../pages/Contato/Contato";
import Sobre from "../pages/Sobre/Sobre";

export default function AppRoutes() {
    return (
        <BrowserRouter>
        <Routes>
            
            <Route path="/" element={<Home />}/>
            <Route path="/sobre" element={<Sobre />}/>
            <Route path="/contato" element={<Contato />}/>
  
         </Routes>
       </BrowserRouter>
    );
}
