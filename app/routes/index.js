// const User = require('../models/mongoose/user');
// const Company = require('../models/mongoose/Company');
const express = require('express');
const router = express.Router();
const { models } = require('../models');

const { Order, OrderItem } = models;

router.get('/order', async (_, res) => {
  // User.findById(req.params._id, (err, pet) => {
  //   if (err) {
  //     console.log('RETRIEVE error: ' + err);
  //     res.status(500).send('Error');
  //   } else if (pet) {
  //     res.status(200).json(pet);
  //   } else {
  //     res.status(404).send('Item not found');
  //   }
  // });
  const feed = await Order.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: OrderItem,
        as: 'orderItem',
      },
    ],
    order: [
      ['createdAt', 'DESC'],
      ['created_at', 'DESC'],
    ],
    limit: 100,
    raw: true,
  });
  console.log(feed);
  res.send({
    data: feed.map((item) => ({
      ...item,
    })),
  });
});

module.exports = router;
