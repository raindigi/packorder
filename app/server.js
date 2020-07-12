require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, models } = require('./models/');
const { PORT } = process.env;
const app = express();
const { Order } = models;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
