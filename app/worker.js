const { OrderWorkerQueue } = require('./lib/queue');
const moment = require('moment');
const { db } = require('./models/sequelize');
const { fetchContent } = require('./lib/queue/worker/contentWorker');

const onFailFetchContent = async (job, err) => {
  return console.error(`failed because ${err}`);
};

const onCompleteFetchContent = (job, feed) => {
  if (feed.length === 0) return;
  const sortedTimestamps = feed.map((item) => item.timestamp).sort();
  const latestTimestamp = sortedTimestamps[sortedTimestamps.length - 1];
  const oneMonthAgo = moment().subtract(1, 'months').unix();
  return latestTimestamp < oneMonthAgo;
};

db.sequelize.sync({}).then(() => {
  OrderWorkerQueue.process('*', fetchContent);
  OrderWorkerQueue.on('failed', onFailFetchContent);
  OrderWorkerQueue.on('completed', onCompleteFetchContent);
});
