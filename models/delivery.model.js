const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = require("./order.model");

const geocoder = require("../utility/geocoder");
const deliverySchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isaccepting: { type: Boolean, default: false },
    //rating: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: "false" },
    tempToken: { type: String, required: true, default: "null" },
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

deliverySchema.pre("save", async function (next) {
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
const Delivery = mongoose.model("Deliveries", deliverySchema);

module.exports = Delivery;
