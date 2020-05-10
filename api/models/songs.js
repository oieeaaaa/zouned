module.exports = (sequelize, DataTypes) => {
  const Songs = sequelize.define('Songs', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    artist: DataTypes.STRING,
    imgSrc: DataTypes.STRING,
    songSrc: DataTypes.STRING,
  }, {});

  Songs.associate = models => {
    Songs.belongsTo(models.Categories, {
      as: 'category',
    });
  };

  return Songs;
};
