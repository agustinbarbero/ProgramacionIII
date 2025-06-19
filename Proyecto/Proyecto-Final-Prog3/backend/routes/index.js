const express = require('express');
const productsRoutes = require('./productos_routes');
const categoriasRoutes = require('./categorias_routes');
const movimientosRoutes = require('./movimientos_routes');
const router = express.Router();

// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de ejemplo
router.get('/test', (req, res) => {
  res.json({
    message: 'Endpoint de prueba',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});


// Rutas para productos, categorías y movimientos
router.use('/productos', productsRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/movimientos', movimientosRoutes);


module.exports = router;
