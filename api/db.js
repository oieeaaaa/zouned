const Sequelize = require('sequelize');

const dev = process.env.NODE_ENV !== 'production';

let config = {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
};

if (!dev) {
  config = {
    name: process.env.DB_PROD_NAME,
    user: process.env.DB_PROD_USER,
    pass: process.env.DB_PROD_PASS,
    host: process.env.DB_PROD_HOST,
    dialect: process.env.DB_PROD_DRIVER,
  };
}

const {
  name,
  user,
  pass,
  host,
  dialect,
} = config;

// db setup
const db = new Sequelize(name, user, pass, {
  host,
  dialect,
});

module.exports = db;
