'use strict';

module.exports = {
  up: async (queryInterface) => {
    const productos = await queryInterface.sequelize.query(
      'SELECT id FROM "Productos" ORDER BY "createdAt";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert('Movimientos', [
      {
        tipo: 'Ingreso',
        cantidad: 100,
        productoId: productos[0].id, // Smartphone X
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'Venta',
        cantidad: 2,
        productoId: productos[1].id, // Leche Entera
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Movimientos', null, {});
  }
};