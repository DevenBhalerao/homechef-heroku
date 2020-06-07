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

module.exports.login = (req, res) => {
  Delivery.findOne({ username: req.body.username }).then((user) => {
    if (!user)
      return res.json({ status: false, error: "User Exists" }).status(400);

    const validpass = bcrypt.compareSync(req.body.password, user.password);
    if (!validpass)
      return res
        .json({ status: false, error: "Invalid User Credentials" })
        .status(400);

    //create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "720m",
    });
    res.header("auth-token", token).json({ status: true, accesstoken: token });
  });
};

//-------------
//------------
module.exports.getProfileDetails = (req, res) => {
  Delivery.findOne(
    { _id: req.user._id },
    {
      username: 1,
      name: 1,
      phone: 1,
      email: 1,
      address: 1,
      _id: 0,
    },
    (err, result) => {
      if (err) res.json({ status: false, error: err }).status(400);
      else {
        res.json({ status: true, data: result }).status(200);
      }
    }
  );
};
//-------------------------------------
//-----------------------------------

module.exports.updatelatlong = (req, res) => {
  Delivery.findOneAndUpdate(
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

//--------------
//---------------
module.exports.getAllOrders = (req, res) => {
  Delivery.findOne({ _id: req.user._id })
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
module.exports.changeAvailabilityStatus = (req, res) => {
  Delivery.findByIdAndUpdate(
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
module.exports.getPastOrders = (req, res) => {
  Delivery.findOne({ _id: req.user._id })
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
  Delivery.findOne({ _id: req.user._id })
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
  var arr1 = new Array();
  Delivery.findById({ _id: req.user._id })
    .populate("orders")
    .then((result) => {
      //console.log(result);
      for (let index = 0; index < result.orders.length; index++) {
        if (result.orders[index].orderid == req.params.id) {
          cid = result.orders[index].customerid;
          chefid = result.orders[index].homechefid;
          console.log(cid);
          console.log("======");
          User.findOne(
            { _id: cid },
            { address: 1, _id: 0, "location.coordinates": 1 },
            (err, cus) => {
              console.log(cus.location);
              result.orders[index]["customerid"] = cus.address + cus.location;
              // result.orders[index]["coords"] = cus.location;
              //
              Homechef.findOne(
                { _id: chefid },
                { address: 1, _id: 0, "location.coordinates": 1 },
                (err, cus) => {
                  result.orders[index].homechefid = cus.address + cus.location;
                  //
                  arr1.push(result.orders[index]);
                  res.json(arr1);
                }
              );
            }
          );
        }
      }
    })
    .catch((err) => res.status(405).json(err));
};
//------------
//------------
module.exports.changeOrderStatus = (req, res) => {
  Delivery.findOne({ _id: req.user._id })
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
