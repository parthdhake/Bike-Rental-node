const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const customerSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  svgAvatar: { type: String, required: true },
  rentedBikes: [],
  refreshToken: {
    type: [Session],
  },
});

//Remove refreshToken from the response
customerSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

customerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Customer", customerSchema);
