import React from "react";
import { Button, Container, Typography, Stack, TextField, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Login = () => {
  const navigate = useNavigate();

  const handleEntrarSinLogin = () => {
    navigate("/home"); 
  };

  const handleRegistrarse = () => {
    navigate("/registro"); // TODO: Redirige a la página de registro (aún no la tienes)
  };

  return (
    <Container sx={{ paddingTop: 4 }}>
      {/* Logotipo */}
      <img
        src={Logo}
        alt="Logo"
        style={{ height: 200, display: "block", margin: "0 auto" }}
      />

      <Box maxWidth={300} mx="auto" mt={4}>
        <Stack spacing={2}>
          <TextField label="Correo electrónico" variant="outlined" fullWidth />
          <TextField label="Contraseña" type="password" variant="outlined" fullWidth />
          <Button variant="contained" color="primary" size="small">
            Entrar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleEntrarSinLogin}
          >
            Entrar sin logearse
          </Button>

          {/* TODO: Meter la pagina de registro */}
          <Typography variant="body2" align="center" mt={2}>
            ¿No tienes cuenta?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={handleRegistrarse}
              sx={{ cursor: "pointer", color: "secondary.main" }}
            >
              Regístrate aquí
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
