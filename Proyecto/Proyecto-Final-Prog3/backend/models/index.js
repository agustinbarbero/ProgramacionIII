// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

const Categoria = require('./categoria');
const Producto = require('./productos');
const Movimiento = require('./movimiento');

// Establecer relaciones
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Categoria.hasMany(Producto, { foreignKey: 'categoriaId' });

Movimiento.belongsTo(Producto, { foreignKey: 'productoId' });
Producto.hasMany(Movimiento, { foreignKey: 'productoId' });

module.exports = {
  sequelize,
  Sequelize
};