const mongoose = require('mongoose');
const conn1 = require('../../mongooseAuthentication');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: { type: String, unique: true },
  login: { type: String },
  password: { type: String },
  name: { type: String },
  company_id: { type: String, ref: 'Company' },
  credit_cards: { type: Array },
});

module.exports = conn1.makeConn1.model('User', userSchema);
