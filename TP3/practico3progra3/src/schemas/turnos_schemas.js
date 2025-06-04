const joi = require('joi');

const turnosSchemas = {
    createSchema: joi.object({
        pacienteId: joi.string().required(),
        fecha: joi.date().required(),
        hora: joi.string().required(),
    }),
    deleteSchema: joi.object({
        pacienteId: joi.string().required()
    })
};

module.exports = turnosSchemas;