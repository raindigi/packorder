const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: { type: String },
  login: { type: String },
  password: { type: String },
  name: { type: String },
  company_id: { type: String, ref: 'Company' },
  credit_cards: { type: Array },
});

module.exports = mongoose.model('User', userSchema);
