import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import MenuLateral from "../components/MenuLateral";

const ProductoNuevo = () => {
  const [nombre, setNombre] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  // Obtener el ID del usuario logueado desde localStorage
  const usuarioId = localStorage.getItem("usuarioId");

  // Verifica si el ID está disponible, si no, usa un valor por defecto
  const usuario = usuarioId ? parseInt(usuarioId, 10) : 1;

  const handleSubmit = async () => {
    const nuevoProducto = {
      nombre: nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      disponible: true,
      usuario: {
        id: usuario, // Usar el ID del usuario logueado
      },
      categoria: {
        id: parseInt(categoriaId),
      },
    };

    try {
      const response = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (response.ok) {
        alert("¡Producto creado con éxito!");
        setNombre("");
        setCategoriaId("");
        setPrecio("");
        setStock("");
      } else {
        alert("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MenuLateral /> {/* Menú lateral fijo a la izquierda */}
      <Container sx={{ paddingTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Nuevo Producto
        </Typography>

        {/* Nombre */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Nombre"
            variant="outlined"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormControl>

        {/* Categoria */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="ID Categoría"
            variant="outlined"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          />
        </FormControl>

        {/* Precio */}
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

        {/* Stock */}
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

        {/* Botón crear producto */}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Crear Producto
        </Button>
      </Container>
    </Box>
  );
};

export default ProductoNuevo;
