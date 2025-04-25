import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para el indicador de carga

  // Fetch de categorías
  const fetchCategorias = async () => {
    try {
      const responseCategorias = await fetch('http://localhost:8080/api/categorias');
      if (responseCategorias.ok) {
        const dataCategorias = await responseCategorias.json();
        setCategorias(dataCategorias);
      } else {
        console.error('Error en categorías:', responseCategorias.status);
      }
    } catch (error) {
      console.error('Error en el fetch de categorías:', error);
    }
  };

  // Fetch de productos
  const fetchProductos = async () => {
    try {
      const responseProductos = await fetch('http://localhost:8080/api/productos');
      if (responseProductos.ok) {
        const dataProductos = await responseProductos.json();
        setProductos(dataProductos);
      } else {
        console.error('Error en productos:', responseProductos.status);
      }
    } catch (error) {
      console.error('Error en el fetch de productos:', error);
    }
  };

  // Llamar ambos fetch y actualizar estado de carga
  const fetchData = async () => {
    await Promise.all([fetchCategorias(), fetchProductos()]);
    setIsLoading(false); // Indicar que la carga ha terminado
  };

  // useEffect para llamar fetchData
  useEffect(() => {
    fetchData();
  }, []);

  // Renderización de la interfaz
  return (
    <div className="App">
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Sección de Categorías */}
          <div style={{ width: '45%' }}>
            <h1>Categorías</h1>
            <p>Lista de categorías de la API:</p>
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

          {/* Sección de Productos */}
          <div style={{ width: '45%' }}>
            <h1>Productos</h1>
            <p>Lista de productos de la API:</p>
            <ul>
              {productos.length > 0 ? (
                productos.map((producto, index) => (
                  <li key={index}>{producto.nombre} - Stock: {producto.stock}</li>
                ))
              ) : (
                <li>No hay productos disponibles</li>
              )}
            </ul>

            <form action="http://localhost:8080/api/productos" method="POST">
            <p>Crear un producto</p>
            <p>Nombre:</p>
            <input type="text" id="nombre" placeholder="Nombre del producto" />
            <p>Stock:</p>   
            <input type="number" id="stock" placeholder="Stock del producto" />
            <p>Precio:</p>  
            <input type="number" id="precio" placeholder="Precio del producto" />
            <p>Categoría:</p>   
            <select id="categoriaId">
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria.id}>{categoria.nombre}</option>
              ))}
            </select> 
            <button type="submit" formAction="http://localhost:8080/api/productos" formMethod="POST">Crear Producto</button>
            </form>
           

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
