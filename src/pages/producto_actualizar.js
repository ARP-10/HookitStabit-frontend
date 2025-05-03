import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MenuLateral from "../components/MenuLateral";

const ProductoEditar = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [producto, setProducto] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el producto actual por ID
    const fetchProducto = async () => {
      const response = await fetch(`http://localhost:8080/api/productos/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProducto(data);
        setNombre(data.nombre);
        setPrecio(data.precio);
        setStock(data.stock);
      } else {
        console.error("Error al obtener el producto");
      }
    };

    fetchProducto();
  }, [id]);

  const handleActualizar = async () => {
    if (!producto) return;
  
    const productoActualizado = {
      id: producto.id,
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      disponible: producto.disponible,
      categoria: producto.categoria,
      usuario: producto.usuario,
    };
  
    console.log("Datos enviados:", productoActualizado); // Verifica en la consola
  
    try {
      const response = await fetch(`http://localhost:8080/api/productos/actualizar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoActualizado),
      });
  
      if (response.ok) {
        alert("Producto actualizado correctamente");
        navigate("/api/productos/productos_usuario"); // Redirigir a la página de productos
      } else {
        alert("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Error de conexión");
    }
  };
  

  // TODO: ver si lo borro porque funciona todo
  if (!producto) return <p>Cargando...</p>;

  return (
    <Box sx={{ display: "flex" }}>
      <MenuLateral />
      <Container sx={{ paddingTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Editar Producto
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Nombre"
            variant="outlined"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="precio">Precio</InputLabel>
          <OutlinedInput
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            label="Precio"
            type="number"
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="stock">Stock</InputLabel>
          <OutlinedInput
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            label="Stock"
            type="number"
          />
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleActualizar}>
          Actualizar Producto
        </Button>
      </Container>
    </Box>
  );
};

export default ProductoEditar;
