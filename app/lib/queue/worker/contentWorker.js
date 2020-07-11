const { dataTransformer } = require('../../../app');
const { sequelize, models } = require('../../../models/');

const { Order, Delivery, OrderItem } = models;

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
      await sequelize.transaction((transaction) =>
        Promise.all(
          feed.map((order) => {
            return Order.upsert(order, { transaction });
          }),
        ),
      );
      break;
    case 'Delivery':
      await sequelize.transaction((transaction) =>
        Promise.all(
          feed.map((delivery) => {
            return Delivery.upsert(delivery, { transaction });
          }),
        ),
      );
      break;
    case 'Order Items':
      await sequelize.transaction((transaction) =>
        Promise.all(
          feed.map((items) => {
            return OrderItem.upsert(items, { transaction });
          }),
        ),
      );
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
