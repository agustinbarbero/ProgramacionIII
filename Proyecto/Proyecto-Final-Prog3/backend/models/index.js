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
    dialectOptions: dbConfig.dialectOptions,
    define: {
      freezeTableName: true, // Evita pluralización automática
      underscored: false,    // Mantiene camelCase
      timestamps: true       // Habilita createdAt/updatedAt
    }
  }
);

const db = {
  sequelize,
  Sequelize,
  Categoria: require('./entities/categoria_entities')(sequelize, Sequelize.DataTypes),
  Producto: require('./entities/productos_entities')(sequelize, Sequelize.DataTypes),
  Movimiento: require('./entities/movimiento_entities')(sequelize, Sequelize.DataTypes)
};

// Configurar asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName] && db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;