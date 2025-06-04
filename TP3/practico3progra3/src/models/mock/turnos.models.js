const turno = require("./../mock/entities/turnos.entity.js");
const paciente = require('../../models/mock/pacientes.models.js');
const Config = require("./../../config/config.js");
const jwt = require("jsonwebtoken");
class TurnosModel {
    constructor() {

        this.data = [];
        this.data.push(
            new turno(
                '2023-10-01',
                "10:00",
                1
            )
        );
        this.id = 2;
    }
    list() {
        return Promise.resolve(this.data);
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            try {
                const turno = this.data.find((t) => t.id === parseInt(id));
                if (!turno) {
                    throw new Error("El turno no existe");
                }
                resolve(turno);
            } catch (error) {
                reject(error);
            }
        });
    }
    validate(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const turnoFound = await this.findById(id);

                if (!turnoFound) {
                    throw new Error("Turno no encontrado");
                }

                // payload, secreto, tiempo de expiracion
                const payload = {
                    turnoId: turnoFound.id,
                    pacienteId: turnoFound.pacienteId,
                };
                console.log("palabra secreta, turnos model:", Config.secreteWord);

                const token = jwt.sign(payload, Config.secreteWord, {
                    expiresIn: Config.expiresIn,
                });
                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    }
    create(pacienteId, fecha, hora) {
        const turnoData = new turno(fecha, hora, pacienteId);
        return new Promise((resolve, reject) => {
                //TODO: verificar que exista el paciente con pacienteID
                if (paciente.getPacienteById(pacienteId) === null) {
                    reject(new Error("Paciente no encontrado"));
                }
                turnoData.id = this.id++;
                this.data.push(turnoData);
                resolve(turnoData);
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            try {
                const index = this.data.findIndex((t) => t.id === id);
                if (index === -1) {
                    throw new Error("Turno no encontrado");
                }
                this.data.splice(index, 1);
                resolve({ message: "Turno eliminado correctamente" });
            } catch (error) {
                reject(error);
            }
        });
    }
}
module.exports = new TurnosModel();
