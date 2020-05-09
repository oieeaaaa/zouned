const router = require('express').Router();

// handlers
const { getSongs } = require('./modules/songs/songs');

// routes
router.get('/songs', getSongs);

module.exports = router;
