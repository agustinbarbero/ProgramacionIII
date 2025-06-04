const { Router } = require('express');
const turnosController = require('../controllers/API/turnos.controller.js');
const { verifyTokenMiddleware } = require('../middlewares/verifyToken.middleware.js');
const rutaTurnos = Router();
const schema = require("../schemas/turnos_schemas.js");
const { validate } = require('../middlewares/validate.js');

rutaTurnos.get('/', verifyTokenMiddleware, turnosController.list);
rutaTurnos.get('/:idPaciente', verifyTokenMiddleware, turnosController.getturnosbyId);
//rutaTurnos.post('/create' ,verifyTokenMiddleware, turnosController.create);
rutaTurnos.post('/create',validate(schema.createSchema),verifyTokenMiddleware , turnosController.create);
rutaTurnos.delete('/delete/:id', validate(schema.deleteSchema), verifyTokenMiddleware, turnosController.delete);

module.exports = rutaTurnos;