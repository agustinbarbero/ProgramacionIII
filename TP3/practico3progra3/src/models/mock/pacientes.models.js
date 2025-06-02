const Persona = require("./../mock/entities/paciente.entity.js");
const Config = require("./../../config/config.js");
const jwt = require("jsonwebtoken");
class PacientesModel {
  constructor() {
    this.data = [];
    this.data.push(
      new Persona(
        "123456787",
        "Sergio",
        "Antozzi",
        "email@gmail.com",
        "12345",
        1
      )
    );
    this.id = 2;
  }

  findByEmail(email, password) {
    return new Promise((resolve, reject) => {
      try {
        const paciente = this.data.find(
          (p) => p.email === email && p.password === password
        );
        if (paciente === null) {
          throw new Error("el paciente no existe");
        }
        resolve(paciente);
      } catch (error) {
        reject(error);
      }
    });
  }
  validate(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const userFound = await this.findByEmail(email, password);

        if (!userFound || userFound.password == null) {
          throw new Error("wrong email or password");
        }

        //payload, secreto, tiempo de expiracion
        const payload = {
          userId: userFound._id,
          userEmail: userFound.email,
        };
        console.log("palabra secreta, pacientes model:", Config.secreteWord);

        const token = jwt.sign(payload, Config.secreteWord, {
          expiresIn: Config.expiresIn,
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }

  // crea un dato nuevo (alta de cliente)
  create(paciente) {
    //TODO: verificar que no sea nulo si es nulo tierar excepcion
  
    return new Promise((resolve, reject) => {
      try {
        paciente.id = this.id;
        this.id++;
        const pacienteEncontrado = this.data.find(p => p.email === paciente.email)
        if (pacienteEncontrado === undefined) {
          this.data.push(paciente);
        } else {
          throw new Error("el paciente ya existe")
        }
        resolve(paciente);
      } catch (error) {
        reject(error);
      }

    });
  }
  // actualiza los datos del cliente con id = id
  update(id, paciente) {
    return new Promise((resolve, reject) => {
      try {

        const pacienteEncontrado = this.data.find((p) => p.id == id);
        if (pacienteEncontrado === null) {
          throw new Error("No se encuntra el paciente");
        }
        pacienteEncontrado.dni = paciente.dni;
        pacienteEncontrado.email = paciente.email;
        pacienteEncontrado.nombre = paciente.nombre;
        pacienteEncontrado.apellido = paciente.apellido;
        pacienteEncontrado.password = paciente.password;
        resolve(pacienteEncontrado);
      } catch (error) {
        reject(error);
      }
    })

  }
  // elimina el cliente con id = id
  delete(id) {
    return new Promise((resolve, reject) => {

        console.log("id recibido:", id);
        const pacienteEncontrado = this.data.find((p) => p.id == id); 
        console.log(typeof(id))        
        if (pacienteEncontrado == undefined) {
          throw new Error("el id no es válido");
        }
        const pos = this.data.indexOf(pacienteEncontrado);
        this.data.splice(pos, 1);
        resolve(pacienteEncontrado); // elimina el elemento de la posición pos del arreglo
      } 
        
    )}

  // devuelve la lista completa en un arreglo de strings
  list(){
    return new Promise((resolve, reject) => {
      resolve(this.data);
    });
  }
  getPacienteById(id) {
    return new Promise((resolve, reject) => {
      try {
        const identificador = Number(id);
        const pacienteEncontrado = this.data.find(paciente => paciente.id === identificador)
        if (!pacienteEncontrado) {
          throw new Error("el id es incorrecto");
        }
        resolve(pacienteEncontrado);
      } catch (error) {
        reject(error)
      }

    })
  }
}

module.exports = new PacientesModel();
