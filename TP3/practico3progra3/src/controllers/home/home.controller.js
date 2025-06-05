const turnosMock = require('../../models/mock/turnos.models')
const pacientesMock = require('../../models/mock/pacientes.models')

// controladores
const turnos = async (req, res) => {
    const turnos = await turnosMock.list();
    res.render('index', {
        title: 'Dashboard Hospital',
        message: 'Turnos',
        turnos
    });
}

const pacientes = async (req, res) => {
    const pacientes = await pacientesMock.list();
    res.render('pacientes', {
        title: 'Dashboard Hospital',
        message: 'Pacientes',
        pacientes
    }

    )
}
module.exports = {
    turnos,
    pacientes
}



