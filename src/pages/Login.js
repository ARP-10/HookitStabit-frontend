import React, { useState } from "react";
import {
  Button, Container, Typography, Stack,
  TextField, Box, Link
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEntrar = async () => {
    try {
      // Resetear errores
      setEmailError(false);
      setPasswordError(false);
  
      const response = await fetch("http://localhost:8080/api/login/validar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const user = await response.json();
        console.log("Login correcto:", user);

        // Guardamos el user logeado en localstorage
        localStorage.setItem("usuarioLogueado", JSON.stringify(user));


        navigate("/home");
      } else if (response.status === 401) {
        const motivo = await response.text();
        
        // Ajustar errores específicos
        setEmailError(motivo === "email");
        setPasswordError(motivo === "password");
  
      } else {
        alert("Error inesperado al intentar iniciar sesión.");
      }
    } catch (error) {
      console.error("Error de login:", error);
      alert("Error de conexión con el servidor.");
    }
  };  

  const handleEntrarSinLogin = () => navigate("/home");
  const handleRegistrarse = () => navigate("/registro");

  return (
    <Container sx={{ paddingTop: 4 }}>
      <img src={Logo} alt="Logo" style={{ height: 200, display: "block", margin: "0 auto" }} />

      <Box maxWidth={300} mx="auto" mt={4}>
        <Stack spacing={2}>
          <TextField
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Correo no registrado." : ""}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError ? "Contraseña incorrecta." : ""}
          />
          <Button variant="contained" color="primary" size="small" onClick={handleEntrar}>
            Entrar
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={handleEntrarSinLogin}>
            Entrar sin logearse
          </Button>

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
