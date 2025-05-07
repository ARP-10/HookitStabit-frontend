import React from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Carrito = ({ carrito, eliminarDelCarrito }) => {
  if (!carrito || carrito.length === 0) {
    return <Typography variant="h6">El carrito está vacío</Typography>;
  }
  // Calculamos el total
  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>

      <Grid container spacing={2}>
        {carrito.map((producto, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
              <CardMedia
                component="img"
                image={`https://picsum.photos/80?random=${index}`}
                alt={producto.nombre}
                sx={{ width: 80, height: 80, marginRight: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{producto.nombre}</Typography>
                <Typography variant="body2">
                  Precio: {producto.precio} €
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="error"
                  onClick={() => eliminarDelCarrito(producto.id)}
                >
                  <CloseIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Total */}
      <Typography variant="h5" sx={{ marginTop: 3 }}>
        TOTAL: {total.toFixed(2)} €
      </Typography>

      {/* Botón Comprar */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        fullWidth
      >
        Comprar
      </Button>
    </Container>
  );
};

export default Carrito;
