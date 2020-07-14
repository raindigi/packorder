require('dotenv').config();
const Queue = require('bull');
const contentConfig = require('../../content/index');
const { REDIS_URL } = process.env;

const ORDER_WORKER_QUEUE = 'podcast content worker';

const OrderWorkerQueue = new Queue(ORDER_WORKER_QUEUE, REDIS_URL);

contentConfig.forEach((config) =>
  OrderWorkerQueue.add(config.name, config, {
    repeat: { cron: '*/2 * * * *' },
  }),
);

module.exports = { OrderWorkerQueue };
