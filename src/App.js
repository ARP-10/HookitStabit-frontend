import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductoDetalle from "./pages/producto_detalle";
import ProductoNuevo from "./pages/producto_nuevo";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/api/productos/:id" element={<ProductoDetalle />} />
        <Route path="/api/productos/producto_nuevo" element={<ProductoNuevo />} />
      </Routes>
    </Router>
  );
};



export default App;
