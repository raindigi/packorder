require('dotenv').config();
const mongoose = require('mongoose');
const { MONGO_URL, MONGO_URL_2 } = process.env;

exports.makeConn1 = mongoose.createConnection(MONGO_URL, { useNewUrlParser: true }, function (err) {
  if (!err) {
    console.log(`Database Server connection created at: Customer`);
  } else {
    console.log(`Error starting server ${err}`);
  }
});

//Create connection one to postDB

exports.makeConn2 = mongoose.createConnection(MONGO_URL_2, { useNewUrlParser: true }, function (
  err,
) {
  if (!err) {
    console.log(`Database Server connection created at: Company`);
  } else {
    console.log(`Error starting server ${err}`);
  }
});
