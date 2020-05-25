module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Songs', [
    {
      title: 'Kathang Isip',
      description: 'Kathang Isip -- Joimee\'s Cover',
      artist: 'Joimee',
      imgSrc: '/assets/joimee.jpg',
      songSrc: '/assets/kathang-isip.m4a',
      categoryId: 1,
      duration: 82,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'Rain',
      description: 'N / A',
      artist: 'Joimee',
      categoryId: 4,
      songSrc: '/assets/Rain.m4a',
      imgSrc: '/assets/guillaume-bourdages-m8q2I_jPYzI-unsplash.jpg',
      duration: 90.25596371882087,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ], {}),
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
