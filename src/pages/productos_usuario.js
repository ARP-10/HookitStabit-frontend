import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import MenuLateral from "../components/MenuLateral";
import { useNavigate } from "react-router-dom";

const MisProductos = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  // Obtener el ID del usuario logueado desde localStorage
  const usuarioId = sessionStorage.getItem("usuarioId");

  useEffect(() => {
    // Obtener los productos del usuario logueado
    const fetchProductos = async () => {
      const response = await fetch(`http://localhost:8080/api/productos/usuario/${usuarioId}`);
      if (response.ok) {
        const data = await response.json();
        setProductos(data);
      } else {
        console.error("Error al obtener productos");
      }
    };

    fetchProductos();
  }, [usuarioId]);

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Eliminar el producto del estado local (UI)
        setProductos(productos.filter((producto) => producto.id !== id));
        alert("Producto eliminado correctamente");
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Error al eliminar el producto");
    }
  };

  const handleActualizar = (id) => {
    // Redirigir a la página de edición del producto con el ID
    navigate(`/api/productos/actualizar/${id}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MenuLateral />
      <Container sx={{ paddingTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mis productos
        </Typography>

        {productos.length === 0 ? (
          <Typography>No tienes productos.</Typography>
        ) : (
          productos.map((producto) => (
            <Box key={producto.id} sx={{ mb: 2 }}>
              <Typography variant="h6">{producto.nombre}</Typography>
              <Typography>Precio: €{producto.precio}</Typography>
              <Typography>Stock: {producto.stock}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleActualizar(producto.id)}
                
              >
                Actualizar
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleEliminar(producto.id)}
                sx={{ ml: 2 }}
              >
                Eliminar
              </Button>
              
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
};

export default MisProductos;
