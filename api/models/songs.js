module.exports = (sequelize, DataTypes) => {
  const Songs = sequelize.define('Songs', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    artist: DataTypes.STRING,
    imgSrc: DataTypes.STRING,
    songSrc: DataTypes.STRING,
    categoryID: DataTypes.INTEGER,
  }, {});
  Songs.associate = function () {
    // associations can be defined here
  };

  return Songs;
};
