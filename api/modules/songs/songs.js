const { Op } = require('sequelize');
const formidable = require('formidable');
const has = require('lodash.has');
const mm = require('music-metadata');
const cloudinary = require('../../cloudinary');
const { Songs, Categories } = require('../../models');
const getLastWeek = require('../../../js/helpers/getLastWeek');

// GET -- with Sounds of the Week
const getSoundsOfTheWeek = async (req, res) => {
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

  form.parse(req, async (formError, fields, files) => {
    if (formError) {
      next(formError);
      return;
    }

    const { format } = await mm.parseFile(files.songSrc.path);

    try {
      const uploadedSong = await cloudinary.uploader.upload(files.songSrc.path, { resource_type: 'auto' });
      const uploadedImage = await cloudinary.uploader.upload(files.imgSrc.path);

      const data = {
        ...fields,
        categoryID: parseInt(fields.categoryID, 10),
        songSrc: uploadedSong.url,
        imgSrc: uploadedImage.url,
        duration: format.duration,
      };

      const newData = await Songs.create(data);

      res.send(newData);
    } catch (fileUploadError) {
      res.send(fileUploadError);
    }
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

    try {
      // check if there is any file paths need to be updated
      if (fileKeys.length !== 0) {
        await fileKeys.forEach(async key => {
          const uploadedFile = await cloudinary.uploader.upload(fields[key].path, { resource_type: 'auto' });
          data[key] = uploadedFile.url;
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
    } catch (fieldsError) {
      res.send(fieldsError);
    }
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
