import React from "react";
import { Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom"; // Para navegación entre páginas

const MenuLateral = () => {
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
      variant="permanent" // Hace que el Drawer siempre esté visible
      anchor="left"
    >
      <List>
        <ListItem button component={Link} to="http://localhost:3000/api/productos/producto_nuevo">
          <ListItemText primary="Nuevo Producto" />
        </ListItem>
        <Divider />
        {/* Puedes agregar más items en el futuro aquí */}
      </List>
    </Drawer>
  );
};

export default MenuLateral;
