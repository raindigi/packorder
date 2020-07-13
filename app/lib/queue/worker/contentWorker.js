require('dotenv').config();
const { dataTransformer } = require('../../../app');
const { db } = require('../../../models/sequelize/');
const { Order, Delivery, OrderItem } = db;
const User = require('../../../models/mongoose/user');
const Company = require('../../../models/mongoose/company');

const fetchContent = async (job) => {
  const { data } = job;
  console.log('job starts at phase 1 ' + JSON.stringify(data));
  const { name, link } = data;

  console.log(`phase 2 ${name} ${link}`);

  console.log(`fetching data for ${name}`);
  const feed = await dataTransformer(name, link);

  job.progress(50);
  console.log(feed);
  switch (name) {
    case 'Order':
      await db.transaction((transaction) =>
        Promise.all(
          feed.map((order) => {
            return Order.upsert(order, { transaction });
          }),
        ),
      );
      break;
    case 'Delivery':
      await db.transaction((transaction) =>
        Promise.all(
          feed.map((delivery) => {
            return Delivery.upsert(delivery, { transaction });
          }),
        ),
      );
      break;
    case 'Order Items':
      await db.transaction((transaction) =>
        Promise.all(
          feed.map((items) => {
            return OrderItem.upsert(items, { transaction });
          }),
        ),
      );
      break;
    case 'User':
      User.insertMany(feed);
      break;
    case 'Company':
      Company.insertMany(feed);
      break;
    default:
      break;
  }

  job.progress(100);

  // eslint-disable-next-line no-console
  console.log(`job for ${name} successful`);
  return feed;
};

module.exports = { fetchContent };
