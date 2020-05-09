const sequelize = require('sequelize');
const db = require('./db');

// models
const songs = db.import('./models/songs');

const models = {
  songs,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = db;
models.sequelize = sequelize;

module.exports = models;
