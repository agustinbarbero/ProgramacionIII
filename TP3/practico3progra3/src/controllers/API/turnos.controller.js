const turnosmock = require('../../models/mock/turnos.models.js');
const TurnosModel = require('../../models/mock/entities/turnos.entity.js');
const paciente = require('../../models/mock/pacientes.models.js');
const Turnos = require('../../models/sqlite/turnos.models.js');

class TurnosController {
    async list(req, res) {
        res.status(200).json(await turnosmock.list());
    }

    async create(req, res) {
        console.log("creando turno");
        const { pacienteId, fecha, hora } = req.body;
        console.log("pacienteId", pacienteId);
        try {
            // Validar que el paciente exista
            //const pacienteencontrado = await paciente.getPacienteById(pacienteId);
            //console.log("paciente encontrado en controller", pacienteencontrado);
            // const nuevoTurno = new TurnosModel( fecha, hora, pacienteencontrado); // en vez de mandar pacienteId, se manda el objeto paciente
            const turnoCreado = await turnosmock.create(pacienteId, fecha, hora);

            res.status(202).json(turnoCreado);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const turnoBorrado = await turnosmock.delete(Number(id));
            if (!turnoBorrado) {
                throw new Error("Turno no encontrado");
            }
            res.status(200).json(turnoBorrado);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    async getturnosbyId(req, res) {
        const idPaciente = req.params.idPaciente;
        console.log(typeof (idPaciente));
        try {
            const turnos = await Turnos.getTurnosModel(idPaciente);
            res.status(200).json(turnos);
        } catch (error) {
            console.log(controller);
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new TurnosController();