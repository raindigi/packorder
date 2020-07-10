const sequelize = require('../databaseAuthentication');

const models = {
  Podcast: sequelize.import('./podcast.js'),
};

module.exports = { sequelize, models };
