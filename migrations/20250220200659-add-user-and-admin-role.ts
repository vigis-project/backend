module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      {
        value: 'USER',
        description: 'Стандартная роль пользователя',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 'ADMIN',
        description: 'Роль администратора с полным доступом',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles', {
      value: ['USER', 'ADMIN']
    }, {});
  }
};
