const router = require('express').Router();

// handlers
const {
  getSongs,
  addSong,
  editSong,
  delSong,
} = require('./modules/songs/songs');

const {
  getCategorySongs,
  getCategories,
} = require('./modules/categories/categories');

// SONGS
router.get('/songs', getSongs);
router.post('/songs', addSong);
router.put('/songs', editSong);
router.delete('/songs', delSong);

// CATEGORIES
router.get('/categories/:id/songs', getCategorySongs);
router.get('/categories', getCategories);


module.exports = router;
