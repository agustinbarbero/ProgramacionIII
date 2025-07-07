'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      // Un producto pertenece a una categoría
      Producto.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId',
        as: 'categoria'
      });
      // Un producto tiene muchos movimientos
      Producto.hasMany(models.Movimiento, {
        foreignKey: 'productoId',
        as: 'movimientos'
      });
    }
  }
  Producto.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'Productos',
    timestamps: true,
    underscored: false,
    freezeTableName: true
  });

  return Producto;
};
