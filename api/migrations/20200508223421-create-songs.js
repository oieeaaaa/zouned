module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Songs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    artist: {
      type: Sequelize.STRING,
    },
    imgSrc: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
    },
    songSrc: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
    },
    categoryID: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Songs'),
};
