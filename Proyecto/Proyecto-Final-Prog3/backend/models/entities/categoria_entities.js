'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      // Una categoría tiene muchos productos
      Categoria.hasMany(models.Producto, { foreignKey: 'categoriaId' });
    }
  }

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
    tableName: 'Categorias',
    timestamps: true,  
    underscored: false,
    freezeTableName: true
  });
  return Categoria;
};