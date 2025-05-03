import React from "react";
import usePerfil from "../hooks/usePerfil";
import MenuLateral from "../components/MenuLateral";
import { Box, Typography } from "@mui/material";

const Perfil = () => {
  const { usuario, loading, error } = usePerfil();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ display: "flex" }}>
      <MenuLateral /> {/* Menú lateral fijo a la izquierda */}

      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        {usuario ? (
          <>
            <Typography variant="h4" gutterBottom>
              Perfil de {usuario.nombre}
            </Typography>
            <Typography>Email: {usuario.email}</Typography>
            <Typography>ID: {usuario.id}</Typography>
          </>
        ) : (
          <p>No se encontraron datos de perfil.</p>
        )}
      </Box>
    </Box>
  );
};

export default Perfil;
