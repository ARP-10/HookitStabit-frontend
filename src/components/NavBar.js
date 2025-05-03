import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Logo from "../assets/Logopeque.png";

//TODO: Crear boton de cerrar sesion
const NavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      color="secondary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logotipo */}
        <IconButton color="inherit" onClick={() => navigate("/home")}>
          <img src={Logo} alt="Logo" style={{ height: 50 }} />
        </IconButton>

        {/* Iconos alineados a la derecha */}
        <div>
          <IconButton color="inherit">
            <AddShoppingCartIcon />
          </IconButton>

          <IconButton color="inherit" onClick={() => navigate("/perfil")}>
            <PersonIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
