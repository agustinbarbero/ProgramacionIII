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

const Categoria = require('./categoria')(sequelize, Sequelize.DataTypes);
const Producto = require('./productos')(sequelize, Sequelize.DataTypes);
const Movimiento = require('./movimiento')(sequelize, Sequelize.DataTypes);

// Asociaciones
if (Categoria.associate) Categoria.associate({ Producto, Movimiento, Categoria });
if (Producto.associate) Producto.associate({ Categoria, Movimiento, Producto });
if (Movimiento.associate) Movimiento.associate({ Categoria, Producto, Movimiento });

module.exports = {
  sequelize,
  Sequelize,
  Categoria,
  Producto,
  Movimiento
};