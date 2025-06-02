const joi = require('joi');

const turnoSchema = joi.object({
    pacienteId: joi.string().required(),
    
    fecha: joi.date().required(),
    hora: joi.string().required(),
    
});
const deleteSchema = joi.object({
    pacienteId: joi.string().required()
});
