const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Menu = require("./menu.model");
const geocoder = require("../utility/geocoder");
const homechefschema = new schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isVerified: { type: Boolean, default: "false" },
    tempToken: { type: String, required: true, default: "null" },
    isaccepting: { type: Boolean, default: false },
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

    menucooked: { type: Array, default: [] },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },

  { timestamps: true }
);
// homechefschema.index({ location: "2dsphere" });

homechefschema.pre("save", async function (next) {
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

const Homechef = mongoose.model("Homechefs", homechefschema);

module.exports = Homechef;
