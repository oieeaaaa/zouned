module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Songs', [{
    title: 'Kathang Isip',
    description: 'Kathang Isip -- Joimee\'s Cover',
    artist: 'Joimee',
    imgSrc: '/assets/joimee.jpg',
    songSrc: '/assets/kathang-isip.m4a',
    categoryID: 1,
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
