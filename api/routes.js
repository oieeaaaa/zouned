const router = require('express').Router();

// handlers
const {
  getSoundsOfTheWeek,
  getSongs,
  addSong,
  editSong,
  delSong,
} = require('./modules/songs/songs');

const {
  getCategorySongs,
  getCategories,
  getPlayQueue,
} = require('./modules/categories/categories');

// SONGS
router.get('/songs/sounds-of-the-week', getSoundsOfTheWeek);
router.get('/songs', getSongs);
router.post('/songs', addSong);
router.put('/songs', editSong);
router.delete('/songs/:id', delSong);

// CATEGORIES
router.get('/categories/:id/songs', getCategorySongs);
router.get('/categories/:id/play-queue', getPlayQueue);
router.get('/categories', getCategories);


module.exports = router;
