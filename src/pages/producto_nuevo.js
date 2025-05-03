import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import MenuLateral from "../components/MenuLateral";

const ProductoNuevo = () => {
  const [nombre, setNombre] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categorias, setCategorias] = useState([]);

  const usuarioId = localStorage.getItem("usuarioId");
  const usuario = usuarioId ? parseInt(usuarioId, 10) : 1;

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/categorias");
        if (res.ok) {
          const data = await res.json();
          setCategorias(data);
        } else {
          console.error("Error al cargar categorías");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async () => {
    const nuevoProducto = {
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      disponible: true,
      usuario: { id: usuario },
      categoria: { id: parseInt(categoriaId) },
    };

    try {
      const response = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      <MenuLateral />
      <Container sx={{ paddingTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Nuevo Producto
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Nombre"
            variant="outlined"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormControl>

        {/* Categoría como desplegable */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="categoria-label">Categoría</InputLabel>
          <Select
            labelId="categoria-label"
            value={categoriaId}
            label="Categoría"
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            {categorias.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.nombre}
              </MenuItem>
            ))}
          </Select>
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

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Crear Producto
        </Button>
      </Container>
    </Box>
  );
};

export default ProductoNuevo;
