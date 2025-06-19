const controller = require('../controllers/movimientos_controller');
const express = require('express');
const router = express.Router();

// Rutas para movimientos
router.post('/', controller.createMovimiento);
router.get('/', controller.getMovimientos);
router.get('/:id', controller.getMovimientoById);
router.put('/:id', controller.updateMovimiento);
router.delete('/:id', controller.deleteMovimiento);

// Exportar el router
module.exports = router;

