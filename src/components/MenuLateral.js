import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Toolbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const MenuLateral = () => {
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleCerrarSesion = () => {
    // Limpiar localStorage
    sessionStorage.removeItem("usuarioLogueado");
    sessionStorage.removeItem("usuarioId");

    // Redirigir al login
    navigate("/");
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Este Toolbar vacío sirve como espacio para que el drawer no se solape con el AppBar */}
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/perfil">
          <ListItemText primary="Info perfil" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/api/productos/productos_usuario">
          <ListItemText primary="Mis productos" />
        </ListItem>
        <Divider />

        <ListItem button component={Link} to="/api/productos/producto_nuevo">
          <ListItemText primary="Nuevo Producto" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/api/productos/producto_nuevo">
          <ListItemText primary="Logros" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/api/productos/producto_nuevo">
          <ListItemText primary="Mis compras" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/api/productos/producto_nuevo">
          <ListItemText primary="Mis ventas" />
        </ListItem>
        <Divider />

        {/* Botón de cerrar sesión */}
        <ListItem button onClick={handleCerrarSesion}>
          <ListItemText primary="Cerrar sesión" />
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  );
};

export default MenuLateral;
