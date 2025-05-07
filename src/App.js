import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProductoDetalle from "./pages/producto_detalle";
import ProductoNuevo from "./pages/producto_nuevo";
import Login from "./pages/Login";
import Registro from "./pages/Registro_usuario";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import MisProductos from "./pages/productos_usuario";
import ProductoEditar from "./pages/producto_actualizar"; 
import Carrito from "./pages/Carrito";

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
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/api/productos/detalles/:id" element={<ProductoDetalle />} /> {/* Ruta de detalle */}
        <Route path="/api/productos/actualizar/:id" element={<ProductoEditar />} /> {/* Ruta de actualización */}
        <Route path="/api/productos/producto_nuevo" element={<ProductoNuevo />} />
        <Route path="/api/productos/productos_usuario" element={<MisProductos />} />
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
