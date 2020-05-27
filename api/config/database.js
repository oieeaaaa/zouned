const { config } = require('../db');

console.log(config);

module.exports = {
  production: {
    ...config,
    dialect: 'mysql',
  },
  development: {
    ...config,
    dialect: 'mysql',
  },
};
