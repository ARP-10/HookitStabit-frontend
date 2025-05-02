import React, { useState } from "react";
import {
  Button, Container, Typography, Stack,
  TextField, Box, Link
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Registro = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombreError, setNombreError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleRegistrarse = async () => {
    try {
      // Resetear errores
      setNombreError(false);
      setEmailError(false);
      setPasswordError(false);

      const response = await fetch("http://localhost:8080/api/login/nuevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      if (response.ok) {
        console.log("Usuario creado correctamente");
        navigate("/home");
      } else {
        const motivo = await response.text();
        
        // Manejo de errores basado en la respuesta del backend
        setNombreError(motivo === "nombre");
        setEmailError(motivo === "email");
        setPasswordError(motivo === "password");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <Container sx={{ paddingTop: 4 }}>
      <img src={Logo} alt="Logo" style={{ height: 200, display: "block", margin: "0 auto" }} />

      <Box maxWidth={300} mx="auto" mt={4}>
        <Stack spacing={2}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            error={nombreError}
            helperText={nombreError ? "El nombre es obligatorio." : ""}
          />
          <TextField
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Correo no válido o ya registrado." : ""}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError ? "Contraseña inválida." : ""}
          />
          <Button variant="contained" color="primary" size="small" onClick={handleRegistrarse}>
            Registrarse
          </Button>

          <Typography variant="body2" align="center" mt={2}>
            ¿Ya tienes una cuenta?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/login")}
              sx={{ cursor: "pointer", color: "secondary.main" }}
            >
              Inicia sesión aquí
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default Registro;
