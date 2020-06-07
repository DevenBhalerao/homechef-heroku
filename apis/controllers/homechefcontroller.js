let User = require("../../models/User.model");
let Homechef = require("../../models/homechef.model");
let Delivery = require("../../models/delivery.model");
let Menu = require("../../models/menu.model");
let jwt = require("jsonwebtoken");
let Order = require("../../models/order.model");
let nodemailer = require("nodemailer");
let transport = require("nodemailer-smtp-transport");
require("dotenv").config();
let bcrypt = require("bcryptjs");
const auth = require("../authtoken");
//---------------------------------------------------------//
//----------------------------------------------------------//

module.exports.getProfileDetails = (req, res) => {
  Homechef.findOne(
    { _id: req.user._id },
    { _id: 0, password: 0, location: 0, orders: 0, menucooked: 0 }
  )
    .then((chef) => {
      res.json({ status: true, data: chef }).status(200);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};

//-------------------
//------------------

module.exports.changeAvailabilityStatus = (req, res) => {
  Homechef.findByIdAndUpdate(
    { _id: req.user._id },
    { isaccepting: req.params.val }
  )
    .then((chef) => {
      res.json({ status: true, data: "Status  Updated " }).status(200);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};
//--------
//----------
module.exports.updateaddress = (req, res) => {
  Homechef.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true })
    .then((result) => {
      res
        .json({ status: true, data: "User Address Updated Successfully" })
        .status(200);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};

//---------------------
//------------------------
module.exports.updatelatlong = (req, res) => {
  Homechef.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        "location.coordinates": [
          parseFloat(req.body.longi),
          parseFloat(req.body.lat),
        ],
      },
    }
  )
    .then((chef) => {
      res.json({ status: true, data: "Lat long updated" }).status(200);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};
//------------
//----------
module.exports.getMenuDetails = (req, res) => {
  Homechef.findOne(
    { _id: req.user._id },
    {
      menucooked: 1,
      _id: 0,
    }
  )
    .then((menu) => {
      res.json({ status: true, data: menu }).status(200);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};
//-------------
//--------
module.exports.addItemsOneByOne = (req, res) => {
  var items = {
    itemId: req.body.itemId,
    catogaryName: req.body.catogaryName,
    subcatogaryName: req.body.subcatogaryName,

    price: Number(req.body.price),
    picture: req.body.picture,
  };
  Homechef.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { menucooked: items } }
  )
    .then((result) => {
      res.json({ status: true, data: "Item added to the Menu" }).status(200);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};
//---------
//---------

module.exports.addMenu = (req, res) => {
  Homechef.findOneAndUpdate(
    { _id: req.user._id },

    { $push: { menucooked: req.body.products } }
  )
    .then((result) => {
      res.json({ status: true, data: "Items added to the Menu" }).status(200);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};

//-----------
//-----------
module.exports.getAllOrders = (req, res) => {
  Homechef.findOne({ _id: req.user._id })
    .populate("orders")

    .then((result) => {
      res.json({ status: true, data: result.orders }).status(200);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};
//-----------
//-----------
module.exports.getPastOrders = (req, res) => {
  Homechef.findOne({ _id: req.user._id })
    .populate("orders")
    .then((result) => {
      var arr = new Array();
      console.log(result);
      for (let index = 0; index < result.orders.length; index++) {
        if (result.orders[index].status == "deliverd") {
          arr.push(result.orders[index]);
        }
      }
      res.json({ status: true, data: arr }).status(200);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};
//-----------
//-----------
module.exports.getActiveOrders = (req, res) => {
  Homechef.findOne({ _id: req.user._id })
    .populate("orders")
    .then((result) => {
      var arr = new Array();
      console.log(result);
      for (let index = 0; index < result.orders.length; index++) {
        if (result.orders[index].status != "deliverd") {
          arr.push(result.orders[index]);
        }
      }
      res.json({ status: true, data: arr }).status(200);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};
//------------
//---------------
module.exports.getOrderById = (req, res) => {
  Homechef.findById({ _id: req.user._id })
    .populate("orders")
    .then((order) => {
      var flag = 0;
      for (var i = 0; i < order.orders.length; i++) {
        if (order.orders[i].orderid == req.params.id) {
          flag = 1;
          break;
        }
      }
      if (flag) res.json({ status: true, data: order.orders[i] }).status(200);
      else res.json({ status: false, error: "Order not Found" }).status(400);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};
//------------
//------------
module.exports.changeOrderStatus = (req, res) => {
  Homechef.findOne({ _id: req.user._id })
    .populate("orders")
    .then((result) => {
      var flag = 0;
      for (let index = 0; index < result.orders.length; index++) {
        if (result.orders[index].orderid == req.params.orderid) {
          flag = 1;
        }
      }
      if (flag == 0) res.json("order is not their");
      else if (flag == 1) {
        Order.Order.findOneAndUpdate(
          { orderid: req.params.orderid },
          { status: req.params.status }
        )
          .then((result) => {
            res
              .json({ status: true, data: "Order Status Updated" })
              .status(200);
          })
          .catch((err) => {
            res.json({ status: false, error: err }).status(400);
          });
      }
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};
//-----------
//----------
module.exports.deleteuser = (req, res) => {
  Homechef.findOneAndDelete({ _id: req.user._id }, (err, result) => {
    if (err) res.json({ status: false, error: err }).status(400);
    else {
      res.json({ status: true, data: "User Deleted" }).status(200);
    }
  });
};
