const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderschema = new schema(
  {
    orderid: { type: String, required: true },
    customerid: { type: String },
    homechefid: { type: String },
    serviceboyid: { type: String },
    status: {
      type: String,
      default: "waiting",
      enum: [
        "accepted",
        "waiting",
        "preparing",
        "dispatched",
        "deliverd",
        "rejected",
      ],
    },
    catogary: { type: String, required: true },
    product: [
      {
        itemid: { type: String },
        quantity: { type: Number },
        totalprice: { type: Number },
        detailsifany: { type: String },
      },
    ],
    paymentType: { type: String },
    totalCost: { type: Number },
    paymentdone: { type: Boolean, default: "false", required: true },
  },

  { timestamps: true }
);

const Order = mongoose.model("Order", orderschema);

module.exports.Order = Order;
