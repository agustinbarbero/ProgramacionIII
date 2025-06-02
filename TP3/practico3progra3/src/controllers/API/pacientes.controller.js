const pacientesModel = require("./../../models/mock/pacientes.models.js");
const Paciente  = require("./../../models/mock/entities/paciente.entity.js");


class PacientesController {
  async login(req, res) {

    //recolecto credenciales
    try {
      const { email, password } = req.body;

      const token = await pacientesModel.validate(email, password);

      res.status(200).json(token);

    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async list(req, res) {
    res.status(200).json(await pacientesModel.list());
  }

  async create(req, res) {
    const { dni, nombre, apellido, email, password } = req.body;
    
    const nuevoPaciente = new Paciente(dni, nombre, apellido, email, password);

    const info = await pacientesModel.create(nuevoPaciente);
    res.status(200).json(info);
  }


  delete(req, res) {
    const id = req.params.id;

    const pacienteBorrado = pacientesModel.delete(id);
    pacienteBorrado.then(paciente => {
      res.status(200).json(paciente);
    }).catch(
      error => {
        res.status(404).json({ message: `no existe el paciente conh el id:${id}`, error })
      }

    );

  }
  update(req, res) {
    const id = req.params.id;
    const { dni, nombre, apellido, email, password } = req.body;
    const nuevoPaciente = new Paciente(dni, nombre, apellido, email, password);
    pacientesModel.update(id, nuevoPaciente);
    res.status(200).json({ message: "actualizado" });
  }
}

module.exports = new PacientesController();
