import React, { useState, useEffect } from 'react';

const App = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: 0,
    stock: 0,
    categoria: { id: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Función handleChange debe estar definida antes de su uso
  const handleChange = (e) => {
    const { id, value } = e.target;
    setNuevoProducto(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categorias');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  const crearProducto = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (response.ok) {
        alert('Producto creado con éxito');
        fetchProductos(); // Recargar productos
      } else {
        alert('Error al crear el producto');
      }
    } catch (error) {
      console.error('Error al crear producto:', error);
      alert('Error al conectar con el servidor');
    }
  };

  const fetchData = async () => {
    try {
      await Promise.all([fetchCategorias(), fetchProductos()]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
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

          <div style={{ width: '45%' }}>
            <h1>Productos</h1>
            <ul>
              {productos.length > 0 ? (
                productos.map((producto, index) => (
                  <li key={index}>{producto.nombre} - Stock: {producto.stock}</li>
                ))
              ) : (
                <li>No hay productos disponibles</li>
              )}
            </ul>

            <form onSubmit={crearProducto}>
              <p>Crear un producto</p>
              <p>Nombre:</p>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre del producto"
                value={nuevoProducto.nombre}
                onChange={handleChange}
              />
              <p>Stock:</p>
              <input
                type="number"
                id="stock"
                placeholder="Stock del producto"
                value={nuevoProducto.stock}
                onChange={handleChange}
              />
              <p>Precio:</p>
              <input
                type="number"
                id="precio"
                placeholder="Precio del producto"
                value={nuevoProducto.precio}
                onChange={handleChange}
              />
              <p>Categoría:</p>
              <select
                id="categoriaId"
                value={nuevoProducto.categoria.id}
                onChange={handleChange}
              >
                {categorias.map((categoria, index) => (
                  <option key={index} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              <button type="submit">Crear Producto</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
