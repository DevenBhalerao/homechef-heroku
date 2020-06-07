const mongoose = require("mongoose");
const schema = mongoose.Schema;
const geocoder = require("../utility/geocoder");

const Order = require("./order.model");

const userschema = new schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isVerified: { type: Boolean, default: "false" },
    tempToken: { type: String, required: true, default: "null" },
    status: {
      type: String,
      enum: ["customer", "homechef", "serviceboy"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number],
        index: "2dsphere",
        require: true,
      },
    },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },

  { timestamps: true }
);
//geocode

userschema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
  };
  this.address = loc[0].formattedAddress;
  //
  next();
  // console.log(loc);
});
const User = mongoose.model("Users", userschema);
module.exports = User;
