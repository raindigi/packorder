require('dotenv').config();
const Sequelize = require('sequelize');
// your credentials
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL);

let retries = 5;
while (retries) {
  try {
    sequelize.authenticate();
    console.log('Authentication is a success');
    break;
  } catch (error) {
    console.log('error', error);
    retries -= 1;
    console.log(`retries left ${retries}`);
    new Promise((res) => setTimeout(res, 5000));
  }
}

module.exports = sequelize;
