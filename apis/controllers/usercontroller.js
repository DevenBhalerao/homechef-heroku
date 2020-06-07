let User = require("../../models/User.model");
let Homechef = require("../../models/homechef.model");
let Delivery = require("../../models/delivery.model");
let Menu = require("../../models/menu.model");
let jwt = require("jsonwebtoken");
let nodemailer = require("nodemailer");
let transport = require("nodemailer-smtp-transport");
require("dotenv").config();
let bcrypt = require("bcryptjs");
const auth = require("../authtoken");
//---------------------------------------------------------//
//----------------------------------------------------------//

//mailing options and transportor
var options = {
  service: "gmail",
  auth: {
    user: process.env.EMAILFROM,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
let client = nodemailer.createTransport(transport(options));
//-----------
//-------------
module.exports.register = (req, res) => {
  var status = req.body.status;
  req.body.tempToken = jwt.sign(
    { username: req.body.username, email: req.body.email },
    "token",
    { expiresIn: 3600 }
  );
  const salt = bcrypt.genSaltSync(12);
  const hashpass = bcrypt.hashSync(req.body.password, salt);
  var userdata = {
    username: req.body.username,
    password: hashpass,
    name: req.body.name,
    status: req.body.status,
    tempToken: req.body.tempToken,
    address: req.body.address,
    phone: Number(req.body.phone),
    email: req.body.email,
  };

  if (userdata.status == "customer") {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res
          .json({ status: false, error: "User Email Exists" })
          .status(400);
      }
    });
    User.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        return res
          .json({ status: false, error: "User Credentials Exists" })
          .status(400);
      }
    });
    User.create(userdata)
      .then((result) => {
        var link =
          "http://localhost:5000/users/verifiedCustomer/" + result.tempToken;

        var email = {
          from: process.env.EMAILFROM,
          to: result.email,
          subject: "Email Veification from homechef",
          text: "Verification Link",
          html:
            '<h5>Link valid for 1 hour.Click to verify our email.</h5>Please click <a href="' +
            link +
            '"> here </a> to activate your account.',
        };
        client.sendMail(email, (err, info) => {
          if (err) res.json(err);
        });
        res
          .json({ status: true, data: "User Registered Successfully" })
          .status(200);
      })
      .catch((err) => {
        res.json({ status: false, error: err.messages }).status(400);
      });
  } //---------------
  else if (userdata.status == "homechef") {
    Homechef.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res
          .json({ status: false, error: "User Email Exists" })
          .status(400);
      }
    });
    Homechef.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        return res
          .json({ status: false, error: "User Credentials Exists" })
          .status(400);
      }
    });
    Homechef.create(userdata)
      .then((result) => {
        var link =
          "http://localhost:5000/users/verifiedHomechef/" + result.tempToken;

        var email = {
          from: process.env.EMAILFROM,
          to: result.email,
          subject: "Email Veification from homechef",
          text: "Verification Link",
          html:
            '<h5>Link valid for 1 hour.Click to verify our email.</h5>Please click <a href="' +
            link +
            '"> here </a> to activate your account.',
        };
        client.sendMail(email, (err, info) => {
          if (err) res.json(err);
        });
        res
          .json({ status: true, data: "User Registered Successfully" })
          .status(200);
      })
      .catch((err) => {
        res.json({ status: false, error: err.messages }).status(400);
      });
  } else if (userdata.status == "serviceboy") {
    Delivery.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res
          .json({ status: false, error: "User Email Exists" })
          .status(400);
      }
    });
    Delivery.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        return res
          .json({ status: false, error: "User Credentials Exists" })
          .status(400);
      }
    });
    Delivery.create(userdata)
      .then((result) => {
        var link =
          "http://localhost:5000/users/verifiedDelivery/" + result.tempToken;

        var email = {
          from: process.env.EMAILFROM,
          to: result.email,
          subject: "Email Veification from homechef",
          text: "Verification Link",
          html:
            '<h5>Link valid for 1 hour.Click to verify our email.</h5>Please click <a href="' +
            link +
            '"> here </a> to activate your account.',
        };
        client.sendMail(email, (err, info) => {
          if (err) res.json(err);
        });
        res
          .json({ status: true, data: "User Registered Successfully" })
          .status(200);
      })
      .catch((err) => {
        res.json({ status: false, error: err.messages }).status(400);
      });
  }
};

//----------------------------------------------------------
//----------------------------------------------------------
module.exports.verifyCustomer = (req, res) => {
  User.findOne({ tempToken: req.params.token }, (err, result) => {
    if (err) res.json({ status: false, error: err }).status(400);
    else {
      var token = req.params.token;

      jwt.verify(token, "token", (err, decoded) => {
        if (err) {
          User.findOneAndRemove({ isVerified: false }, (err1, result) => {
            if (err1) res.json({ status: false, error: err1 }).status(400);
            else res.json({ status: false, error: err }).status(400);
          });
        } else if (!result) {
          User.findOneAndRemove({ isVerified: false }, (err, result) => {
            if (err) res.json({ status: false, error: err }).status(400);
            else
              res.json({ status: false, error: "Token not found" }).status(404);
          });
        } else {
          result.isVerified = true;
          result.tempToken = false;
          result.save((err) => {
            if (err) res.json({ status: false, error: err }).status(400);
            else {
              var email = {
                from: process.env.EMAILFROM,
                to: result.email,
                subject: "Customer account activated",
                text: "Welcome to homechef",
                html: "<h1>Account activted</h1>",
              };
              client.sendMail(email, (err, info) => {
                if (err) res.json({ status: false, error: err }).status(400);
                else {
                  //res.json({ status: true, data: info }).status(200);
                }
              });
              //res.json("saved");
              res.json({ status: true, data: result }).status(200);
            }
          });
        }
      });
    }
  });
};
//--------------------------------------
//----------------------------------
module.exports.verifyHomechef = (req, res) => {
  Homechef.findOne({ tempToken: req.params.token }, (err, result) => {
    if (err) res.json({ status: false, error: err }).status(400);
    else {
      var token = req.params.token;

      jwt.verify(token, "token", (err, decoded) => {
        if (err) {
          Homechef.findOneAndRemove({ isVerified: false }, (err1, result) => {
            if (err1) res.json({ status: false, error: err1 }).status(400);
            else res.json({ status: false, error: err }).status(400);
          });
        } else if (!result) {
          Homechef.findOneAndRemove({ isVerified: false }, (err, result) => {
            if (err) res.json({ status: false, error: err }).status(400);
            else
              res.json({ status: false, error: "Token not found" }).status(404);
          });
        } else {
          result.isVerified = true;
          result.tempToken = false;
          result.save((err) => {
            if (err) res.json({ status: false, error: err }).status(400);
            else {
              var email = {
                from: process.env.EMAILFROM,
                to: result.email,
                subject: "Homechef account activated",
                text: "Welcome to homechef",
                html: "<h1>Account activted</h1>",
              };
              client.sendMail(email, (err, info) => {
                if (err) res.json({ status: false, error: err }).status(400);
                else {
                  //res.json({ status: true, data: info }).status(200);
                }
              });

              res.json({ status: true, data: result }).status(200);
            }
          });
        }
      });
    }
  });
};
//----------------------------------------------------------
//----------------------------------------------------------
module.exports.verifyServiceBoy = (req, res) => {
  Delivery.findOne({ tempToken: req.params.token }, (err, result) => {
    if (err) res.json({ status: false, error: err }).status(400);
    else {
      var token = req.params.token;

      jwt.verify(token, "token", (err, decoded) => {
        if (err) {
          Delivery.findOneAndRemove({ isVerified: false }, (err1, result) => {
            if (err1) res.json({ status: false, error: err1 }).status(400);
            else res.json({ status: false, error: err }).status(400);
          });
        } else if (!result) {
          Delivery.findOneAndRemove({ isVerified: false }, (err, result) => {
            if (err) res.json({ status: false, error: err }).status(400);
            else
              res.json({ status: false, error: "Token not found" }).status(404);
          });
        } else {
          result.isVerified = true;
          result.tempToken = false;
          result.save((err) => {
            if (err) res.json({ status: false, error: err }).status(400);
            else {
              var email = {
                from: process.env.EMAILFROM,
                to: result.email,
                subject: "Service Boy  account activated",
                text: "Welcome to homechef",
                html: "<h1>Account activted</h1>",
              };
              client.sendMail(email, (err, info) => {
                if (err) res.json({ status: false, error: err }).status(400);
                else {
                  // res.json({ status: true, data: info }).status(200);
                }
              });
              //res.json("saved");
              res.json({ status: true, data: result }).status(200);
            }
          });
        }
      });
    }
  });
};
//----------------------------------------------------------
//-------------------------------------------------------
module.exports.login = (req, res) => {
  if (req.body.status == "customer") {
    User.findOne({ username: req.body.username }).then((user) => {
      if (!user)
        return res.json({ status: false, error: "User Exists" }).status(400);

      const validpass = bcrypt.compareSync(req.body.password, user.password);
      if (!validpass)
        return res
          .json({ status: false, error: "Invalid User Credentials" })
          .status(400);
      //
      //check for verified email
      // if (user.isVerified == false) {
      //   res.status(401).json("email is not verified");
      // }
      //create and assign token
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "720m",
      });
      res
        .header("auth-token", token)
        .json({ status: true, accesstoken: token });
    });
  }

  //homechef login stuff
  //
  else if (req.body.status == "homechef") {
    Homechef.findOne({ username: req.body.username }).then((user) => {
      if (!user)
        return res.json({ status: false, error: "User Exists" }).status(400);
      //
      //compare password
      const validpass = bcrypt.compareSync(req.body.password, user.password);
      if (!validpass)
        return res
          .json({ status: false, error: "Invalid User Credentials" })
          .status(400);
      //check if email is verified
      //for testing it is commented
      // if (user.isVerified == false) {
      //   res.status(401).json("email is not verified");
      // }
      //jwt connection
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "720m",
      });
      res
        .header("auth-token", token)
        .json({ status: true, accesstoken: token });
    });
  }
  //service boy
  else if (req.body.status == "serviceboy") {
    Delivery.findOne({ username: req.body.username }).then((user) => {
      if (!user)
        return res.json({ status: false, error: "User Exists" }).status(400);
      //
      //compare password
      const validpass = bcrypt.compareSync(req.body.password, user.password);
      if (!validpass)
        return res
          .json({ status: false, error: "Invalid User Credentials" })
          .status(400);
      //check if email is verified
      //for testing it is commented
      // if (user.isVerified == false) {
      //   res.status(401).json("email is not verified");
      // }
      //jwt connection
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "720m",
      });
      res
        .header("auth-token", token)
        .json({ status: true, accesstoken: token });
    });
  }
};

//-------------------------------------
//-----------------------------------
module.exports.getProfileDetails = (req, res) => {
  User.findOne(
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
module.exports.updateaddress = (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true })
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
  User.findOneAndUpdate(
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
module.exports.deleteuser = (req, res) => {
  User.findOneAndDelete({ _id: req.user._id }, (err, result) => {
    if (err) res.json({ status: false, error: err }).status(400);
    else {
      res.json({ status: true, data: "User Deleted" }).status(200);
    }
  });
};

//-----------
//--------------
module.exports.getAllOrders = (req, res) => {
  User.findOne({ _id: req.user._id })
    .populate("orders")
    .then((result) => {
      res.json({ status: true, data: result.orders }).status(200);
    })
    .catch((err) => {
      res.json({ status: false, error: err }).status(400);
    });
};

//-------------
//-------------
module.exports.getOrderById = (req, res) => {
  User.findById({ _id: req.user._id })
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
