const controller = require('../controllers/categorias_controller');
const express = require('express');
const router = express.Router();

router.get('/', controller.getCategorias);
router.get('/:id', controller.getCategoriaById);
router.post('/', controller.createCategoria);
router.put('/:id', controller.updateCategoria);
router.delete('/:id', controller.deleteCategoria);


module.exports = router;