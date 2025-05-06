import { useState, useEffect } from "react";

const usePerfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const usuarioGuardado = sessionStorage.getItem("usuarioLogueado");
        if (!usuarioGuardado) throw new Error("Usuario no logueado");

        const { id } = JSON.parse(usuarioGuardado);

        const response = await fetch(`http://localhost:8080/api/perfil/${id}`);

        if (!response.ok) {
          throw new Error("No se pudo obtener el perfil");
        }

        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  return { usuario, loading, error };
};

export default usePerfil;
