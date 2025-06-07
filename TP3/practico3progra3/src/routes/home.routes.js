const {Router} = require('express');
const {turnos, pacientes} = require('../controllers/home/home.controller.js')
const rutaHome = Router();

rutaHome.get('/', (req, res) => {
  res.redirect('/turnos');
});
rutaHome.get('/turnos', turnos);
rutaHome.get('/pacientes', pacientes);

module.exports = rutaHome;






