import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import Form from "./Components/Form/Form";
import Navbar from "./Components/Navbar/Navbar";
import EditAdmin from "./Components/Admin/EditAdmin";

function App() {
  return (
    <>
    

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />}/>
        <Route path="admin" element={<Admin />}/>
        <Route path="edit" element={<EditAdmin />}/>
      </Routes>
    </BrowserRouter>
    </>
      


  );
}

export default App;
