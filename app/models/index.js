const sequelize = require('../sequelizeAuthentication');

const models = {
  Order: sequelize.import('./sequelize/order.js'),
  OrderItem: sequelize.import('./sequelize/orderItem'),
  Delivery: sequelize.import('./sequelize/delivery'),
};

module.exports = { sequelize, models };
