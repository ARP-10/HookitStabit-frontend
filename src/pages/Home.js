import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  CircularProgress,
  Grid,
  Stack,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useUsuarioLogueado from "../hooks/UsuarioLogueado";

const Home = () => {
  const [categorias, setCategorias] = React.useState([]);
  const [productos, setProductos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const usuario = useUsuarioLogueado();

  const navigate = useNavigate(); // Colocado dentro de un componente envuelto por <Router>

  const fetchData = async () => {
    try {
      const [categoriasResponse, productosResponse] = await Promise.all([
        fetch("http://localhost:8080/api/categorias"),
        fetch("http://localhost:8080/api/productos"),
      ]);

      const categoriasData = await categoriasResponse.json();
      const productosData = await productosResponse.json();

      setCategorias(categoriasData);
      setProductos(productosData);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleCategoriaClick = (categoriaNombre) => {
    console.log(`Has hecho click en la categoría: ${categoriaNombre}`);
  };

  return (
    <Container sx={{ paddingTop: 4 }}>
      {isLoading ? (
        // Muestra un spinner de carga si los datos no han llegado
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "8px",
              }}
            >
              Bienvenido, {usuario ? usuario.nombre : "Invitado"}
            </span>
            <Typography
              variant="body1"
              sx={{ color: "#888", fontSize: "1.1rem" }}
            >
              ID: {usuario ? usuario.id : "No disponible"}
            </Typography>
          </Typography>

          <Typography variant="h4" gutterBottom>
            Categorías
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            sx={{ marginBottom: 4 }}
          >
            {categorias.length > 0 ? (
              categorias.map((categoria, index) => (
                <Chip
                  key={index}
                  label={categoria.nombre}
                  color="secondary"
                  variant="outlined"
                  sx={{ fontSize: "1rem" }}
                  onClick={() => handleCategoriaClick(categoria.nombre)}
                />
              ))
            ) : (
              <Typography>No hay categorías disponibles</Typography>
            )}
          </Stack>

          <Typography variant="h4" gutterBottom>
            Productos
          </Typography>
          <Grid container spacing={3}>
            {productos.length > 0 ? (
              productos.map((producto, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://picsum.photos/300/200?random=${index}`}
                      alt={`Imagen del producto ${index}`}
                      sx={{
                        width: 300,
                        height: 200,
                        objectFit: "cover",
                        alignSelf: "center",
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {producto.nombre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Stock: {producto.stock}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Precio: {producto.precio} €
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "space-between" }}>
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() =>
                          navigate(`/api/productos/${producto.id}`)
                        }
                      >
                        Ver detalles
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No hay productos disponibles</Typography>
            )}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Home;
