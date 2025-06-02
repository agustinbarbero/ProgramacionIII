const {Turno} = require ('../sqlite/entities/turnos.entity.js');

const getTurnosModel = async (idPaciente) => {
    const turnos = await Turno.findAll({
        where: { pacienteId: idPaciente }
    });
    return turnos;
}
const create = async (turno) => {
    const nuevoTurno = await Turno.create({
        pacienteId: turno.pacienteId,
        fecha: turno.fecha,
        hora: turno.hora
    });
    return nuevoTurno;
}
const deleteTurno = async (pacienteId) => {
    const turnoBorrado = await Turno.destroy({
        where: { pacienteId }
    });
    return turnoBorrado;
}
module.exports = {
    getTurnosModel,
    create,
    deleteTurno
};