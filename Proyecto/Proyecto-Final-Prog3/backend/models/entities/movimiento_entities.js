const { Model } = require('sequelize');

'use strict';
// const Productos = require('./productos');
module.exports = (sequelize, DataTypes) => {
  class Movimiento extends Model {
    static associate(models) {
      Movimiento.belongsTo(models.Producto, {
        foreignKey: 'productoId',
        as: 'producto'
      });
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
      defaultValue: 'ingreso',
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fechaHora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Movimiento',
    tableName: 'Movimientos',
    timestamps: true,
    underscored: false,
    freezeTableName: true
  });

  return Movimiento;
};
