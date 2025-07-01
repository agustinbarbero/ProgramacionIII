'use strict';
// const Productos = require('./productos');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movimiento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movimiento.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.ENUM('venta', 'ingreso'),
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fechaHora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Movimiento',
  });

  Movimiento.associate = (models) => {
    Movimiento.belongsTo(models.Producto, {
      foreignKey: 'productoId',
      as: 'producto'
    });
  };

  return Movimiento;
};