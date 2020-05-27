require('dotenv').config(); // this is important!
const Sequelize = require('sequelize');

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
};

// db setup
const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
});

db.config = config;

module.exports = db;
