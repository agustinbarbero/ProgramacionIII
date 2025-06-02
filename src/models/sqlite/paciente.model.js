const {Paciente} = require('../sqlite/entities/paciente.entity.js');

  const getPacientesModel =  ()=>{
    const users = Paciente.findAll();
    return users;
  }
//TODO: agregar operaciones CRUD

  const create = async (paciente) => {
    const nuevoPaciente = await Paciente.create({
      dni: paciente.dni,
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      email: paciente.email,
      password: paciente.password
    });
    return nuevoPaciente;
  }
  const update = async (id, paciente) => {
    const pacienteActualizado = await Paciente.update({
      dni: paciente.dni,
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      email: paciente.email,
      password: paciente.password
    }, {
      where: { id }
    });
    return pacienteActualizado;
  }
  const deletePaciente = async (id) => {
    const pacienteBorrado = await Paciente.destroy({
      where: { id }
    });
    return pacienteBorrado;
  }
  const findById = async (id) => {
    const paciente = await Paciente.findByPk(id);
    return paciente;
  }
  
  module.exports = {
    getPacientesModel
  }
