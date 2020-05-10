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
      validate: {
        allowNull: false,
      },
    },
    description: {
      type: Sequelize.STRING,
    },
    artist: {
      type: Sequelize.STRING,
      validate: {
        allowNull: false,
      },

    },
    imgSrc: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
        allowNull: false,
      },
    },
    songSrc: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
        allowNull: false,
      },
    },
    duration: {
      type: Sequelize.INTEGER,
      validate: {
        allowNull: false,
      },
    },
    categoryId: {
      type: Sequelize.INTEGER,
      validate: {
        allowNull: false,
      },

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
