import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [categorias, setCategorias] = useState([]);

  // Funcion para hacer la solicitud HTTP
  const fetchCategorias = async () => {
    try {
      const response = await fetch ('http://localhost:8080/api/categorias');
      if (response.ok) {
        const data = await response.json();
        setCategorias(data); // Guarda los datos en el estado
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // useEffect para llamar a la funcion al cargar el componente
  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="App">
      <h1>Categorías</h1>
      <ul>
        {categorias.length > 0 ? (
          categorias.map((categoria, index) => (
            <li key={index}>{categoria.nombre}</li>
          ))
        ) : (
          <li>No hay categorías disponibles</li>
        )}
      </ul>
    </div>
  )

}

export default App;