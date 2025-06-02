const joi = require('joi');
const pacienteSchema = joi.object({
    dni: joi.string().required(),
    nombre: joi.string().required(),
    apellido: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(20).required(),
    
});
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).max(20).required()
    
});
const updateSchema = joi.object({
    dni: joi.string().required(),
    nombre: joi.string().required(),
    apellido: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(20).required()
});
const deleteSchema = joi.object({
    id: joi.string().required()
});


module.exports = {
    pacienteSchema,
    loginSchema,
    updateSchema,
    deleteSchema
};
