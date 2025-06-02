const turnosmock = require('../../models/mock/turnos.models.js');
const TurnosModel = require('../../models/mock/entities/turnos.entity.js');
const Turnos= require('../../models/sqlite/turnos.models.js');

class TurnosController {
    async list(req, res) {
        res.status(200).json(await turnosmock.list());
    }

    async create(req, res) {
        const { pacienteId, fecha, hora } = req.body;
        try {
            const nuevoTurno = await turnosmock.create(pacienteId, fecha, hora);
            res.status(201).json(nuevoTurno);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { pacienteId } = req.body;
        try {
            const turnoBorrado = await turnosmock.delete(pacienteId);
            res.status(200).json(turnoBorrado);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    async getturnosbyId(req, res) {
        const idPaciente = req.params.idPaciente;
        console.log(typeof(idPaciente));
        try {
            const turnos = await Turnos.getTurnosModel(idPaciente);
            res.status(200).json(turnos);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new TurnosController();