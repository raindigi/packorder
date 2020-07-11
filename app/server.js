require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, models } = require('./models/');

const { PORT } = process.env;
const app = express();
const { Podcast } = models;
app.use(cors());
app.use(bodyParser.json());

app.get('/', async (res) => {
  await Podcast.findAll({
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
    app.listen(PORT, () => console.log(`listening to podcast ${PORT}`));
    console.log('success');
  })
  .catch(() => console.error('fail'));
