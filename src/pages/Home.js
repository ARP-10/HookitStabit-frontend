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
import useUsuarioLogueado from "../hooks/useUsuarioLogueado";

const Home = () => {
  const [categorias, setCategorias] = React.useState([]);
  const [productos, setProductos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    React.useState(null);

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

  const handleCategoriaClick = (idCategoria) => {
    setCategoriaSeleccionada((prevId) =>
      prevId === idCategoria ? null : idCategoria
    );
  };

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(
        (producto) => producto.categoria?.id === categoriaSeleccionada
      )
    : productos;

  return (
    <Container sx={{ paddingTop: 4 }}>
      {isLoading ? (
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

        
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            sx={{ marginBottom: 4, justifyContent: "center" }}
          >
            {/* Botón "Ver todos" */}
            <Chip
              label="Ver todos"
              color={categoriaSeleccionada === null ? "primary" : "default"}
              variant="filled"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                padding: "10px 14px",
                borderRadius: "20px",
                cursor: "pointer",
                backgroundColor:
                  categoriaSeleccionada === null ? "#9c27b0" : "#f3e5f5",
                color: categoriaSeleccionada === null ? "#ffffff" : "#4a148c",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor:
                    categoriaSeleccionada === null ? "#7b1fa2" : "#e1bee7",
                },
              }}
              onClick={() => setCategoriaSeleccionada(null)} // Al hacer clic, muestra todos los productos
            />

            {/* Botones de categorías */}
            {categorias.length > 0 ? (
              categorias.map((categoria, index) => (
                <Chip
                  key={index}
                  label={categoria.nombre}
                  color={
                    categoriaSeleccionada === categoria.id
                      ? "primary"
                      : "default"
                  }
                  variant="filled"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    padding: "10px 14px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    backgroundColor:
                      categoriaSeleccionada === categoria.id
                        ? "#9c27b0"
                        : "#f3e5f5",
                    color:
                      categoriaSeleccionada === categoria.id
                        ? "#ffffff"
                        : "#4a148c",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor:
                        categoriaSeleccionada === categoria.id
                          ? "#7b1fa2"
                          : "#e1bee7",
                    },
                  }}
                  onClick={() => handleCategoriaClick(categoria.id)}
                />
              ))
            ) : (
              <Typography>No hay categorías disponibles</Typography>
            )}
          </Stack>

          
          <Grid container spacing={3}>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto, index) => (
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
                          navigate(`/api/productos/detalles/${producto.id}`)
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
              <Typography>
                No hay productos disponibles en esta categoría
              </Typography>
            )}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Home;
