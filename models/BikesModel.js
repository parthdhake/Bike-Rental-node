const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bikesSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  transmission: { type: String, required: true },
  kmpl: { type: String, required: true },
  price: { type: Number, required: true },
  displacement: { type: String, required: true },
  images: { type: String, required: true },
  availableBikes: { type: Boolean, required: true },
});

module.exports = mongoose.model("Bikes", bikesSchema, "Bikes");
