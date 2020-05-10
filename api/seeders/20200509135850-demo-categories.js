module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Categories', [
    {
      name: 'Binaurial',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Zen',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Nature',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Cool',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Categories', null, {}),
};
