const turnosMock = require('../../models/mock/turnos.models')
const pacientesMock = require('../../models/mock/pacientes.models')

// controladores
const home = async (req, res) => {
    const turnos = await turnosMock.list();
    const pacientes = await pacientesMock.list();
    res.render('index', {
        title: 'Dashboard Hospital',
        message: 'Turnos',
        turnos
    });
}
module.exports = {
    home
}



