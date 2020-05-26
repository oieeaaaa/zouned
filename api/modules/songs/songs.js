const { Op } = require('sequelize');
const formidable = require('formidable');
const path = require('path');
const has = require('lodash.has');
const mm = require('music-metadata');
const { Songs, Categories } = require('../../models');
const getLastWeek = require('../../../js/helpers/getLastWeek');

const assetsDir = path.resolve(__dirname, '../../../public/assets');

// GET -- with Sounds of the Week
const getSoundsOfTheWeek = async (req, res) => {
  console.log(getLastWeek.toString());
  const data = await Songs.findAll({
    where: {
      createdAt: {
        [Op.gte]: getLastWeek(),
      },
    },
  });

  res.send(data);
};

// GET
const getSongs = async (req, res) => {
  const { query } = req;

  const options = {
    replacements: {
      query: query.search,
    },
    attributes: {
      exclude: ['categoryId'],
    },
    include: [
      {
        model: Categories,
        as: 'category',
      },
    ],
  };

  // if the user wants to search we give it to him
  if ('search' in query && query.search !== '') {
    options.where = {
      title: {
        [Op.like]: `${query.search}%`,
      },
    };
  }

  // SUPER COOL! (i just figured out associations in SEQUELIZE!)
  const data = await Songs.findAll(options);

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
      console.log({ assetsDir, fileName: file.name });
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
  const { params } = req;

  await Songs.destroy({ where: { id: params.id } });

  res.send({
    msg: 'Song is destroyed!',
    id: req.params.id,
  });
};

module.exports = {
  getSoundsOfTheWeek,
  getSongs,
  addSong,
  editSong,
  delSong,
};
