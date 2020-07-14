const User = require('../models/mongoose/user');
const Company = require('../models/mongoose/Company');
const express = require('express');
const router = express.Router();
const { db } = require('../models/sequelize');

const { Order, OrderItem, Delivery } = db;

router.get('/order', async (_, res) => {
  const customerCollection = await User.find({}, ' -credit_cards -_id -password -__v');
  const companyCollection = await Company.find({}, ' -_id  -__v');
  const orders = await Order.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt,'],
    },

    order: [['created_at', 'DESC']],
    limit: 100,
    raw: true,
  });
  const orderItems = await OrderItem.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    limit: 100,
    raw: true,
  });

  const deliveries = await Delivery.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    limit: 100,
    raw: true,
  });

  let extendedSet = new Set([...companyCollection, ...customerCollection]);

  console.log(extendedSet);

  res.send({
    orders: orders.map((item) => ({
      ...item,
    })),
    deliveries: deliveries.map((item) => ({
      ...item,
    })),
    orderItems: orderItems.map((item) => ({
      ...item,
    })),
    customer: customerCollection.map((item) => ({
      ...item._doc,
    })),
    customer_company: companyCollection.map((item) => ({
      ...item._doc,
    })),
  });
});

module.exports = router;
