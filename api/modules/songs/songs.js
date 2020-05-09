const { songs } = require('../../models.js');

const getSongs = async (req, res) => {
  const data = await songs.findAll({
    attributes: ['title', 'description'],
  });

  res.send(data);
};

module.exports = {
  getSongs,
};
