module.exports = (sequelize, DataTypes) => {
  const Songs = sequelize.define('Songs', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    artist: DataTypes.STRING,
    imgSrc: DataTypes.STRING,
    songSrc: DataTypes.STRING,
    duration: DataTypes.INTEGER,
  }, {});

  Songs.associate = models => {
    Songs.belongsTo(models.Categories, {
      foreignKey: 'categoryId',
      as: 'category',
    });
  };

  return Songs;
};
