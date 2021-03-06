const { Categories, Songs } = require('../../models');

// GET ONE -- with SONGS
const getCategorySongs = async (req, res) => {
  const { params } = req;

  const data = await Categories.findOne({
    where: { id: params.id },
    include: {
      model: Songs,
      as: 'songs',
    },
  });

  res.send(data);
};

// GET -- with PLAY QUEUE
const getPlayQueue = async (req, res) => {
  const { params } = req;

  const categorySongs = await Categories.findOne({
    where: { id: params.id },
    include: {
      model: Songs,
      as: 'songs',
    },
  });

  res.send(categorySongs.songs);
};

// GET
const getCategories = async (req, res) => {
  const data = await Categories.findAll();

  res.send(data);
};

module.exports = {
  getCategorySongs,
  getPlayQueue,
  getCategories,
};
