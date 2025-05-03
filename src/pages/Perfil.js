import React, { useState } from "react";
import usePerfil from "../hooks/usePerfil";
import MenuLateral from "../components/MenuLateral";
import { Box, Typography, TextField, Button } from "@mui/material";

const Perfil = () => {
  const { usuario, loading, error } = usePerfil();
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEditar = () => {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setPassword("");
    setEditando(true);
  };

  const handleGuardar = async () => {
    const actualizado = {
      id: usuario.id,
      nombre,
      email,
      password: password || usuario.password,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado),
      });

      if (response.ok) {
        alert("Perfil actualizado correctamente");
        window.location.reload();
      } else {
        alert("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error de conexión");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MenuLateral />

      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Perfil
        </Typography>

        {usuario && !editando ? (
          <>
            <Typography>Nombre: {usuario.nombre}</Typography>
            <Typography>Email: {usuario.email}</Typography>
            <Button variant="contained" onClick={handleEditar} sx={{ mt: 2 }}>
              Editar perfil
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="Nombre"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Nueva contraseña"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              helperText="Déjalo vacío para mantener la contraseña actual"
            />
            <Button variant="contained" onClick={handleGuardar}>
              Guardar cambios
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setEditando(false)}
              sx={{ mx: 2 }}
            >
              Salir sin guardar
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Perfil;
