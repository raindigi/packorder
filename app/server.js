require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./models/sequelize');
const { PORT } = process.env;
const app = express();
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`listening to ${PORT}`));
    console.log('success');
  })
  .catch(() => console.error('fail'));
