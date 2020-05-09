const router = require('express').Router();

// handlers
const {
  getSongs,
  addSong,
  editSong,
  delSong,
} = require('./modules/songs/songs');

// routes
router.get('/songs', getSongs);
router.post('/songs', addSong);
router.put('/songs', editSong);
router.delete('/songs', delSong);

module.exports = router;
