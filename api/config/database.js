module.exports = {
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};
