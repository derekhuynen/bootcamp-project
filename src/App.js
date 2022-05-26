
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import Form from "./Components/Form/Form";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="app_container">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="form" element={<Form />}/>
        <Route path="admin" element={<Admin />}/>
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
