const formidable = require('formidable');
const path = require('path');
const has = require('lodash.has');
const mm = require('music-metadata');
const { Songs, Categories } = require('../../models');

const assetsDir = path.resolve(__dirname, '../../../public/assets');

// GET
const getSongs = async (req, res) => {
  // SUPER COOL! (i just figured out associations in SEQUELIZE!)
  const data = await Songs.findAll({
    attributes: {
      exclude: ['categoryId'],
    },
    include: [
      {
        model: Categories,
        as: 'category',
      },
    ],
  });

  res.send(data);
};

// CREATE
const addSong = (req, res, next) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const { format } = await mm.parseFile(files.songSrc.path);

    const data = {
      ...fields,
      categoryID: parseInt(fields.categoryID, 10),
      songSrc: `/assets/${files.songSrc.name}`,
      imgSrc: `/assets/${files.imgSrc.name}`,
      duration: format.duration,
    };

    const newData = await Songs.create(data);

    res.send(newData);
  })
    // store file in /public/assets directory
    .on('fileBegin', (name, file) => {
      file.path = `${assetsDir}/${file.name}`;
    });
};

// UPDATE
const editSong = (req, res, next) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const data = fields;
    const fileKeys = Object.keys(files);

    // check if there is any file paths need to be updated
    if (fileKeys.length !== 0) {
      fileKeys.forEach(key => {
        data[key] = `/assets/${files[key].name}`;
      });
    }

    // update song duration too (if songSrc exists in the payload)
    if ('songSrc' in files) {
      const { format } = await mm.parseFile(files.songSrc.path);

      data.duration = format.duration;
    }

    // check if payload contains categoryID
    if (has(data, 'categoryID')) {
      data.categoryID = parseInt(data.categoryID, 10);
    }

    await Songs.update(data, { where: { id: data.id } });

    const updatedSong = await Songs.findOne({ where: { id: data.id } });

    res.send(updatedSong);
  })
    // store file in /public/assets directory
    .on('fileBegin', (name, file) => {
      if (!file) return false;
      file.path = `${assetsDir}/${file.name}`;
    });
};

// DELETE
const delSong = async (req, res) => {
  await Songs.destroy({ where: { id: req.body.id } });

  res.send({
    msg: 'Song is destroyed!',
    id: req.body.id,
  });
};

module.exports = {
  getSongs,
  addSong,
  editSong,
  delSong,
};
