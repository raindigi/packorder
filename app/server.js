require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { sequelize, models } = require('./models/');
const { PORT, MONGO_URL } = process.env;
const app = express();
const { Order } = models;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.get('/', async (res) => {
  await Order.findAll({
    attributes: { exclude: ['id'] },
    limit: 2,
  })
    .then((data) => {
      console.log(data);
      res.status(200);
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`listening to ${PORT}`));
    console.log('success');
  })
  .catch(() => console.error('fail'));
