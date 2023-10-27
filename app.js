const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de control de inventario');
});

app.get('/api/productos', (req, res) => {
  res.json({ productos: [] });
});

app.post('/api/productos', (req, res) => {
  const nuevoProducto = req.body;
  res.json({ message: 'Producto agregado con éxito', producto: nuevoProducto });
});

app.put('/api/productos/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  res.json({ message: 'Producto actualizado con éxito', producto: updatedProduct });
});

app.delete('/api/productos/:id', (req, res) => {
  const productId = req.params.id;
  res.json({ message: 'Producto eliminado con éxito', productId: productId });
});

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});

const Sequelize = require('sequelize');

const sequelize = new Sequelize('inventario', 'postgres', 'Aleja1609', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos PostgreSQL exitosa.');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos PostgreSQL:', error);
  });

const Producto = sequelize.define('Producto', {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cantidad: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    precio: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  sequelize.sync()
  .then(() => {
    console.log('Tablas sincronizadas con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar tablas con la base de datos:', error);
  });


