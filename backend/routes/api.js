const User = require('../models/pet');
const express = require('express');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const router = express.Router();

router.get('/orders/:_id', (req, res) => {
  Pet.findById(req.params._id, (err, pet) => {
    if (err) {
      console.log('RETRIEVE error: ' + err);
      res.status(500).send('Error');
    } else if (pet) {
      res.status(200).json(pet);
    } else {
      res.status(404).send('Item not found');
    }
  });
});

module.exports = router;
