
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import Form from "./Components/Form/Form";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (

    
    <div className="app_container">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />}/>
        <Route path="admin" element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  


    </div>

    
  );
}

export default App;
