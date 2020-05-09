const sequelize = require('sequelize');
const db = require('./db');

// models
const songs = db.import('./models/songs');

const models = {
  songs,
};

models.sequelize = db;
models.sequelize = sequelize;

module.exports = models;
