const Sequelize = require('sequelize');
const db = require('../db');

// models
const Songs = db.import('./songs');
const Categories = db.import('./categories');

const models = {
  Songs,
  Categories,
};

// Make associations work!
Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = db;
models.Sequelize = Sequelize;

module.exports = models;
