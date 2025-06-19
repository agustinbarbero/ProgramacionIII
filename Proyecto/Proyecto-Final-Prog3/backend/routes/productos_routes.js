const controller = require('../controllers/productos_controller');
const express = require('express');
const router = express.Router();

// Rutas para productos
router.get('/', controller.getProductos);
router.get('/:id', controller.getProductoById);
router.post('/', controller.createProducto);
router.put('/:id', controller.updateProducto);
router.delete('/:id', controller.deleteProducto);

// Exportar el router
module.exports = router;