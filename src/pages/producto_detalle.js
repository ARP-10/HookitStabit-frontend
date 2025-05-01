import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 👈 Añadimos esto
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productos/${id}`
        );
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (isLoading) {
    return (
      <Container sx={{ paddingTop: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container sx={{ paddingTop: 4 }}>
        <Typography variant="h5">Producto no encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ paddingTop: 4 }}>
      {/* Botón para volver */}
      <Button
        variant="outlined"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => navigate(-1)}
      >
        Volver
      </Button>

      <Card sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
        <CardMedia
          component="img"
          height="300"
          image={`https://picsum.photos/600/300?random=${producto.id}`}
          alt="Imagen del producto"
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {producto.nombre}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Precio: {producto.precio} €
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginTop: 2 }}
          >
            Stock disponible: {producto.stock}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)}
            >
              Comprar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductoDetalle;
