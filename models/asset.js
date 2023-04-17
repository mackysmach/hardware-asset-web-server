const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  AssetNo: { type: String },
  Type: { type: String },
  BoughtDate: { type: String },
  Brand: { type: String },
  Duration: { type: String },
  Expense: { type: String },
  Expire: { type: String },
  MSOffice: { type: String },
  MTM: { type: String },
  Model: { type: String },
  Owner: { type: String },
  Remark: { type: String },
  SerialNo: { type: String }
})

module.exports = mongoose.model("hardware-asset", AssetSchema);