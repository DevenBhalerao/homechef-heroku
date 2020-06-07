const mongoose = require("mongoose");
const schema = mongoose.Schema;

const menuschema = new schema({
  products: [
    {
      itemId: { type: String },
      // rating: { type: Number, default: 0 },
      catogaryName: { type: String },
      subcatogaryName: { type: String },
      description: { type: String },
      price: { type: Number },
      picture: { type: String },
      // status: {
      //   type: String,
      //   enum: ["available", "notavailable"],
      //   default: "available",
      // },
    },
  ],
});

const Menu = mongoose.model("Menu", menuschema);

module.exports = Menu;
