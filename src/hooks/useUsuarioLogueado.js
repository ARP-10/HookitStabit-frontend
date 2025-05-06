import { useState, useEffect } from "react";

const useUsuarioLogueado = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("usuarioLogueado");
    if (user) setUsuario(JSON.parse(user));
  }, []);

  return usuario;
};

export default useUsuarioLogueado;
