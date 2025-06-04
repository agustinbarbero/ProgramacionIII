const Identificador = require('./identificador.entity')
class Turnos extends Identificador {
    constructor( fecha, hora, paciente,id=0) {
        super(id);
        this.fecha = fecha;
        this.hora = hora;
        this.paciente = paciente; // Referencia al paciente

    }

    toString() {
        return `Turno ID: ${this.id}, Fecha: ${this.fecha}, Hora: ${this.hora}, Paciente: ${this.paciente}`;
    }
}

module.exports = Turnos;