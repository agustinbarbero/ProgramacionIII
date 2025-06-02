const Identificador = require('./identificador.entity');

class Turnos extends Identificador {
    constructor(id, fecha, hora, paciente) {
        super(id);
        this.fecha = fecha;
        this.hora = hora;
        this.paciente = paciente; // Referencia al paciente

    }

    toString() {
        return `Turno ID: ${this.id}, Fecha: ${this.fecha}, Hora: ${this.hora}, Paciente: ${this.paciente}, Médico: ${this.medico}`;
    }
}

module.exports = Turnos;