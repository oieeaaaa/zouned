module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Songs', [], {}),
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
