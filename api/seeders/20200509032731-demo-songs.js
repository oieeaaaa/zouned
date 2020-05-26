module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Songs', [
    {
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
    {
      title: 'Bad Behaviors',
      description: 'N / A',
      artist: 'Ezequel Marotte',
      categoryId: 3,
      songSrc: '/assets/Bad Behaviors _ www.wowa.me.mp3',
      imgSrc: '/assets/bad-behaviors.jpg',
      duration: 560,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      title: 'Good God',
      description: 'N / A',
      artist: 'Wowa',
      categoryId: 1,
      songSrc: '/assets/Good God _ www.wowa.me.mp3',
      imgSrc: '/assets/good-god.jpg',
      duration: 100,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      title: 'Hangtime',
      description: 'N / A',
      artist: 'Wowa',
      categoryId: 2,
      songSrc: '/assets/Hangtime - unminus.com.mp3',
      imgSrc: '/assets/hangtime.jpg',
      duration: 183,
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
