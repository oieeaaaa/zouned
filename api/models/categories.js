module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
  }, {});

  Categories.associate = models => {
    Categories.hasMany(models.Songs, {
      foreignKey: 'categoryId',
      as: 'songs',
    });
  };

  return Categories;
};
