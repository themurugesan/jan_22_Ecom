import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/singup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Admin from "./pages/admin_folder/admin/admin";
import Admin_dashboard from "./pages/admin_folder/admin_dashboard/Admin_dashboard";
import AdminProduct from "./pages/admin_folder/admin_dashboard/AdminProduct";
import Header from "./pages/header/Header";
import { createContext, useState } from "react";

export const Usercontext=createContext();

function App() {

  const [title, setTitle] = useState('');


  return (
    <div className="App">
      <Usercontext.Provider value={{title,setTitle}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header></Header>}></Route>
          <Route path="/admin" element={<Admin></Admin>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Signup></Signup>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/admindashboard" element={<Admin_dashboard></Admin_dashboard>}></Route>
          <Route path="/adminproduct" element={<AdminProduct></AdminProduct>}></Route>
        </Routes>
      </BrowserRouter>
      </Usercontext.Provider>
    </div>
  );
}

export default App;
