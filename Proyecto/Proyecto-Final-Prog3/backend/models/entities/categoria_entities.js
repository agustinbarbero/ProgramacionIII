'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {}

  Categoria.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'Categorias'
  });
  return Categoria;
};