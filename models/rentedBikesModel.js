const mongoose = require("mongoose");
const Customer = require("./customerModel");
const Bike = require("./BikesModel");
const ObjectId = mongoose.Schema.Types.ObjectId;

const rentedBikeSchema = new mongoose.Schema({
  bike: { type: ObjectId, required: true, ref: "Bike" },
  user: { type: ObjectId, required: true, ref: "Customer" },
  bookingDate: { type: Date, required: true },
  //expiresAt: { type: Date, required: true, expires: 0, default: Date.now() },
  days: { type: Number, required: true },
});

const RentedBikeInfo = mongoose.model("RentedBikeInfo", rentedBikeSchema);

module.exports = RentedBikeInfo;
