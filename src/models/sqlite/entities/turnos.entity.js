const { DataTypes } = require('sequelize');
const { sequelize } = require('./../config/db.js');

const Turno = sequelize.define('Turno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    pacienteId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Pacientes', // Nombre de la tabla referenciada
            key: 'id'
        }
    }
}, {
    timestamps: false // Desactiva los campos createdAt y updatedAt
});

module.exports = { Turno };