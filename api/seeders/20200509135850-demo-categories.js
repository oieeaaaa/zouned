module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Categories', [
    {
      name: 'Happy',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Energy',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Heavy',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Chill',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Categories', null, {}),
};
