import React from "react";
import { Button, Container, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleEntrarSinLogin = () => {
    navigate("/home"); // Redirige a la ruta principal
  };

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>Iniciar sesión</Typography>
      {/* Aquí va tu formulario de login */}

      <Stack spacing={2} direction="column" mt={4}>
        <Button variant="contained" color="primary">Entrar</Button>
        <Button variant="contained" color="secondary" onClick={handleEntrarSinLogin}>
          Entrar sin logearse
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
