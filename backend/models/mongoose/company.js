const mongoose = require('mongoose');
const conn2 = require('../../mongooseAuthentication');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  company_id: { type: Number, unique: true },
  company_name: { type: String },
});

module.exports = conn2.makeConn2.model('Company', companySchema);
