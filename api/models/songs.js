module.exports = (sequelize, DataTypes) => {
  const Songs = sequelize.define('Songs', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});
  Songs.associate = function () {
    // associations can be defined here
  };
  return Songs;
};
