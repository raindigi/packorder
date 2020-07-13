// const User = require('../models/mongoose/user');
// const Company = require('../models/mongoose/Company');
const express = require('express');
const router = express.Router();
const { db } = require('../models/sequelize');

const { Order, OrderItem, Delivery } = db;

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
  const orders = await Order.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: OrderItem,
        as: 'OrderItem',
      },
    ],
    order: [['created_at', 'DESC']],
    limit: 100,
    raw: true,
  });
  const deliveries = await Delivery.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'id'],
    },
    include: [
      {
        model: OrderItem,
        as: 'OrderItem',
      },
    ],

    limit: 100,
    raw: true,
  });

  res.send({
    orders: orders.map((item) => ({
      ...item,
    })),
    deliveries: deliveries.map((item) => ({
      ...item,
    })),
  });
});

module.exports = router;
