module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Songs', [{
    title: 'Moonlight',
    description: 'This is the moonlight',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

  down: (queryInterface) => queryInterface.bulkDelete('Songs', null, {})
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

    */
  ,
};
