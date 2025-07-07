'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Categorias', [
      {
        nombre: 'Electrónicos',
        descripcion: 'Dispositivos electrónicos y gadgets',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Alimentos',
        descripcion: 'Productos alimenticios y bebidas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ropa',
        descripcion: 'Prendas de vestir y accesorios',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categorias', null, {});
  }
};