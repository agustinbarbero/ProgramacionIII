const {Router} = require('express');
const pacientesController = require('../controllers/API/pacientes.controller.js');
const  {verifyTokenMiddleware}  = require('../middlewares/verifyToken.middleware.js');
const rutaPacientes = Router();
const schema= require("../schemas/pacientes_schemas.js");
const { validate } = require('../middlewares/validate.js');

rutaPacientes.get('/',verifyTokenMiddleware, pacientesController.list);
//rutaPacientes.get('/', pacientesController.list);
rutaPacientes.post('/login',validate(schema.loginSchema) ,pacientesController.login)
rutaPacientes.post('/create',validate(schema.pacienteSchema),verifyTokenMiddleware,pacientesController.create);
rutaPacientes.put('/:id',validate(schema.updateSchema),verifyTokenMiddleware,pacientesController.update);
rutaPacientes.delete('/:id',validate(schema.deleteSchema) ,verifyTokenMiddleware,pacientesController.delete); 


//Otras rutas CRUD


module.exports = rutaPacientes;
