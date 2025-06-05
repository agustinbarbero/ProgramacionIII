const {Router} = require('express');
const {turnos, pacientes} = require('../controllers/home/home.controller.js')
const rutaHome = Router();
rutaHome.get('/turnos', turnos);
rutaHome.get('/pacientes', pacientes);

//Otras rutas CRUD


module.exports = rutaHome;






