import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Inventario from "./pages/Inventario";
import Maquila from "./pages/Maquila";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtected from "./components/RoleProtected";
import NavBar from "./components/NavBar";

export default function App(){
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container my-4">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/productos" element={<ProtectedRoute><Productos/></ProtectedRoute>}/>
          <Route path="/inventario" element={<ProtectedRoute><Inventario/></ProtectedRoute>}/>
          <Route path="maquila" element={<ProtectedRoute><Maquila/></ProtectedRoute>}/>
        
          <Route path="/admin" element={<RoleProtected role="ADMIN"><AdminPanel/></RoleProtected>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}