'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Obtener IDs de categorías (asumiendo que se crean en orden)
    const categorias = await queryInterface.sequelize.query(
      'SELECT id FROM "Categorias" ORDER BY "createdAt";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert('Productos', [
      {
        nombre: 'Smartphone X',
        precio: 300000.00,
        stock: 50,
        categoriaId: categorias[0].id, // Electrónicos
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Leche Entera',
        precio: 1500.00,
        stock: 200,
        categoriaId: categorias[1].id, // Alimentos
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Camiseta Básica',
        precio: 10000.00,
        stock: 100,
        categoriaId: categorias[2].id, // Ropa
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Productos', null, {});
  }
};