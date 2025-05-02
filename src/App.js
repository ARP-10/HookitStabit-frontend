import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProductoDetalle from "./pages/producto_detalle";
import ProductoNuevo from "./pages/producto_nuevo";
import Login from "./pages/Login";
import Registro from "./pages/Registro_usuario";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

const AppContent = () => {
  const location = useLocation();

  // Ocultar NavBar en login y registro
  const mostrarNavBar = !["/", "/registro"].includes(location.pathname);

  return (
    <>
      {mostrarNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/api/productos/:id" element={<ProductoDetalle />} />
        <Route path="/api/productos/producto_nuevo" element={<ProductoNuevo />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
