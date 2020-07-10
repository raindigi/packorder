const User = require('../models/pet');
const express = require('express');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const router = express.Router();

router.get('/orders', (req, res) => {
  const orders = User.find({}, (err, orders) => {
    if (err) {
      console.log('RETRIEVE error: ' + err);
      res.status(500).send('Error');
    } else if (orders) {
      res.status(200).json(orders);
    }
  });
});

module.exports = router;
