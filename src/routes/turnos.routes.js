const { Router } = require('express');
const turnosController = require('../controllers/API/turnos.controller.js');
const { verifyTokenMiddleware } = require('../middlewares/verifyToken.middleware.js');
const rutaTurnos = Router();
const schema = require("../schemas/turnos_schemas.js");
const { validate } = require('../middlewares/validate.js');

rutaTurnos.get('/', verifyTokenMiddleware, turnosController.list);
rutaTurnos.get('/api/v1/turnos/:idPaciente', verifyTokenMiddleware, turnosController.getturnosbyId);
rutaTurnos.post('/api/v1/turnos/create', validate(schema.turnoSchema), verifyTokenMiddleware, turnosController.create);
rutaTurnos.delete('/api/v1/turnos/delete', validate(schema.deleteSchema), verifyTokenMiddleware, turnosController.delete);

module.exports = rutaTurnos;