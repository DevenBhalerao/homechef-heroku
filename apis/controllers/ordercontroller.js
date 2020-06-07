let User = require("../../models/User.model");
let Homechef = require("../../models/homechef.model");
let Delivery = require("../../models/delivery.model");
let Menu = require("../../models/menu.model");
let Order = require("../../models/order.model");
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
//sms service
const accountSid = process.env.accountSID;
const authToken = process.env.authToken;
const clientSMS = require("twilio")(accountSid, authToken);

//--------------------------
//---------------------------
let data;
let ChefList = new Array();
module.exports.createOrder = (req, res) => {
  data = req.body;
  data.customerid = req.user._id;
  console.log(data.customerid);
  var longi;
  var lati;
  User.findOne({ _id: data.customerid }).then((user) => {
    longi = user.location.coordinates[0];
    lati = user.location.coordinates[1];
    // console.log(longi + " " + lati);
    //aggregate used///
    Homechef.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longi), parseFloat(lati)],
          },
          distanceField: "dist.calculated",
          maxDistance: 3000000,
          spherical: true,
        },
      },
      // { $match: { isaccepting: true } },
      { $unwind: "$menucooked" },
      {
        $match: { "menucooked.catogaryName": data.catogary, isaccepting: true },
      },
      { $group: { _id: "$_id" } },
      { $sort: { dist: 1 } },
      // {$skip:skips},
    ]).exec((err, result) => {
      if (err) res.json(err);
      else {
        if (result.length > 0) {
          // console.log(result);
          Order.Order.create(data)
            .then((order) => {
              User.findByIdAndUpdate(
                { _id: req.user._id },
                { $push: { orders: order._id } }
              )
                .then((user) => {
                  ChefList = result;
                  console.log(ChefList);

                  let chefId = ChefList[0];
                  Homechef.findOne({ _id: chefId })
                    .then((chef) => {
                      //console.log(chef);
                      chef.tempToken = jwt.sign(
                        { _id: chefId, email: chef.email },
                        "token",
                        {
                          expiresIn: "10m",
                        }
                      );
                      let sendmail = chef.email;
                      // console.log(sendmail);
                      // console.log("-------------------");
                      // console.log(order._id);
                      // console.log("-------------------");

                      let AcceptLink =
                        "http://localhost:5000/order/accept/" +
                        chef._id +
                        "/" +
                        chef.tempToken +
                        "/" +
                        order._id;
                      let RejectLink =
                        "http://localhost:5000/order/reject/" +
                        chef._id +
                        "/" +
                        order._id;
                      var email = {
                        from: process.env.EMAILFROM,
                        to: sendmail,
                        subject: "Cooking Order Notification",
                        text: "Accept or reject the incoming order",
                        html:
                          " <h2>We will inform when to start cooking</h2> " +
                          "Order details    catogary    " +
                          order.catogary +
                          "<br>" +
                          '<h5>Link to accept order <a href="' +
                          AcceptLink +
                          '"> Accept </a></h5><br><h5>Link to reject order  <a href="' +
                          RejectLink +
                          '"> Reject </a></h5><br>',
                      };
                      client.sendMail(email, (err, info) => {
                        if (err) console.log(err);
                        else {
                          console.log(info);
                        }
                      });
                    })
                    .catch((err) => {
                      res.json(err);
                    });
                })
                .catch((err) => {
                  res.json(err);
                });
            })
            .catch((err) => {
              res.json(err);
            });
          res
            .json({ status: true, data: "Order Placed Succesfully" })
            .status(200);
        } else {
          console.log("no heomchef found");
          Order.Order.findByIdAndDelete({ _id: order._id })
            .then((result) => {
              res
                .json({ status: false, error: "No homechef available" })
                .status(404);
            })
            .catch((err) => {
              res.json({ status: false, error: err }).status(404);
            });
        }
      }
    });
  });
};
//---------------
//-----------------
let serviceboy = new Array();
module.exports.acceptOrder = (req, res) => {
  Homechef.findOne({ _id: req.params.id }).then((result) => {
    if (result.tempToken == `rejected${req.params.orderid}`)
      res
        .json({ status: false, error: "You have already rejected the order" })
        .status(408);
    else {
      var token = req.params.token;
      jwt.verify(token, "token", (err, decoded) => {
        if (err) {
          // console.log(err);
          res.json({ status: false, error: err }).status(400);
        } else {
          // result.tempToken = "false";
          Order.Order.findByIdAndUpdate(
            { _id: req.params.orderid },
            { homechefid: req.params.id }
          )
            .then((order) => {
              Homechef.findOneAndUpdate(
                { _id: req.params.id },
                {
                  $set: { tempToken: `accepted${req.params.orderid}` },
                  $push: { orders: order._id },
                }
              )
                .then((chef) => {
                  Order.Order.findByIdAndUpdate(
                    { _id: order._id },
                    { status: "accepted" }
                  )
                    .then((neworder) => {
                      var longi = chef.location.coordinates[0];
                      var lati = chef.location.coordinates[1];
                      // console.log(longi + " " + lati);
                      //aggregate used///
                      Delivery.aggregate([
                        {
                          $geoNear: {
                            near: {
                              type: "Point",
                              coordinates: [
                                parseFloat(longi),
                                parseFloat(lati),
                              ],
                            },
                            distanceField: "dist.calculated",
                            maxDistance: 3000000,
                            spherical: true,
                          },
                        },

                        {
                          $match: { isaccepting: true },
                        },
                        // { $group: { _id: "$_id" } },
                        { $sort: { dist: 1 } },
                        // {$skip:skips},
                      ]).exec((err, result) => {
                        if (err) res.json(err);
                        else {
                          if (result.length > 0) {
                            serviceboy = result;
                            //console.log(serviceboy);

                            let boyId = serviceboy[0];
                            Delivery.findOne({ _id: boyId })
                              .then((boy) => {
                                // console.log(boy);
                                boy.tempToken = jwt.sign(
                                  { _id: boyId, email: boy.email },
                                  "token",
                                  {
                                    expiresIn: "10m",
                                  }
                                );
                                let sendmail = boy.email;
                                console.log(boy.email);
                                let AcceptLink =
                                  "http://localhost:5000/order/acceptdelivery/" +
                                  boy._id +
                                  "/" +
                                  boy.tempToken +
                                  "/" +
                                  neworder._id;
                                let RejectLink =
                                  "http://localhost:5000/order/rejectdelivery/" +
                                  boy._id +
                                  "/" +
                                  neworder._id;
                                console.log(neworder._id);
                                var email = {
                                  from: process.env.EMAILFROM,
                                  to: sendmail,
                                  subject: "Delivery Order Notification",
                                  text: "Accept or reject the incoming order",
                                  html:
                                    "Order details    catogary    " +
                                    neworder.catogary +
                                    "<br>" +
                                    '<h5>Link to accept order <a href="' +
                                    AcceptLink +
                                    '"> Accept </a></h5><br><h5>Link to reject order  <a href="' +
                                    RejectLink +
                                    '"> Reject </a></h5><br>',
                                };
                                client.sendMail(email, (err, info) => {
                                  if (err) console.log(err);
                                  else {
                                    console.log(info);
                                  }
                                });
                              })
                              .catch((err) => {
                                res.json(err);
                              });
                            res
                              .json({ status: true, data: "Order Accepted " })
                              .status(200);
                          } else {
                            console.log("no delivery boy found");

                            res
                              .json({
                                status: false,
                                error: "No delivery boy present",
                              })
                              .status(404);
                          }
                        } //)
                      });
                    })
                    .catch((err) => {
                      res.json(err);
                    }); //after delivery
                })
                .catch((err) => {
                  res.json(err);
                });
            })
            .catch((err) => {
              res.json(err);
            });
        }
      });
    }
  });
};
//---------------
//---------------
module.exports.rejectOrder = (req, res) => {
  Order.Order.findOne({ _id: req.params.orderid }).then((order) => {
    if (order.homechefid == req.params.id)
      res
        .json({ status: false, error: "You have accepted the order" })
        .status(400);
    else {
      Homechef.findOneAndUpdate(
        { _id: req.params.id },
        { tempToken: `rejected${req.params.orderid}` }
      )
        .then((result) => {
          {
            ChefList.shift();
            if (ChefList.length > 0) {
              let chefId = ChefList[0];
              console.log(chefId);
              Homechef.findOne({ _id: chefId })
                .then((chef) => {
                  chef.tempToken = jwt.sign(
                    { _id: chefId, email: chef.email },
                    "token",
                    {
                      expiresIn: "10m",
                    }
                  );

                  let sendmail = chef.email;
                  let AcceptLink =
                    "http://localhost:5000/order/accept/" +
                    chef._id +
                    "/" +
                    chef.tempToken +
                    "/" +
                    req.params.orderid;
                  console.log(req.params.orderid);
                  let RejectLink =
                    "http://localhost:5000/order/reject/" +
                    chef._id +
                    "/" +
                    req.params.orderid;
                  var email = {
                    from: process.env.EMAILFROM,
                    to: sendmail,
                    subject: "Cooking Order Notification",
                    text: "Accept or reject the incoming order",
                    html:
                      " <h2>We will inform when to start cooking</h2> " +
                      // "<h1></h1>Link valid for 1 hour.Click to verify our email. <a href='http://localhost:5000/users/verifiedCustomer/${result.tempToken}'> here</a>",
                      '<h5>Link to accept order <a href="' +
                      AcceptLink +
                      '"> Accept </a></h5><br><h5>Link to reject order  <a href="' +
                      RejectLink +
                      '"> Reject </a></h5><br>',
                  };
                  client.sendMail(email, (err, info) => {
                    if (err) res.json(err);
                    else {
                      res.json(info);
                      // setTimeout(() => {
                      //   console.log("intimeout");
                      //   res.redirect(`http://localhost:5000/order/reject/${chef._id}`);
                      // }, 300000);
                    }
                  });
                })
                .catch((err) => {
                  res.json(err);
                });
            } else {
              console.log("no heomchef found");
              Order.Order.findByIdAndDelete({ _id: order._id })
                .then((result) => {
                  res
                    .json({ status: false, error: "No homechef available" })
                    .status(404);
                })
                .catch((err) => {
                  res.json({ status: false, error: err }).status(404);
                });
            }
          }
        })
        .catch((err) => {
          res.json(err);
        });
    }
  });
};

module.exports.deliveryacceptorder = (req, res) => {
  console.log(req.params.id);
  console.log("============");
  Delivery.findOne({ _id: req.params.id }).then((result) => {
    if (result.tempToken == `rejected${req.params.orderid}`)
      res
        .json({ status: false, error: "You have already rejected the order" })
        .status(408);
    else {
      var token = req.params.token;
      jwt.verify(token, "token", (err, decoded) => {
        if (err) {
          // console.log(err);
          res.json({ status: false, error: err }).status(400);
        } else {
          // result.tempToken = "false";
          Order.Order.findByIdAndUpdate(
            { _id: req.params.orderid },
            { serviceboyid: req.params.id }
          )
            .then((order) => {
              Delivery.findOneAndUpdate(
                { _id: req.params.id },
                {
                  $set: { tempToken: `accepted${req.params.orderid}` },
                  $push: { orders: order._id },
                }
              )
                .then((boy) => {
                  Homechef.findOne({ _id: order.homechefid })
                    .then((chef) => {
                      var sendmail = chef.email;
                      var email = {
                        from: process.env.EMAILFROM,
                        to: sendmail,
                        subject: "Start Cooking Order Notification",
                        text: "",
                        html: "<h2>You can start cooking now</h2>",
                      };
                      client.sendMail(email, (err, info) => {
                        if (err) console.log(err);
                        else {
                          console.log(info);
                        }
                      });
                      res.json({ status: true, data: "Delivery boy assigned" });
                    })
                    .catch((err) => {
                      err;
                    });
                })
                .catch((err) => {
                  res.json(err);
                });
            })
            .catch((err) => {
              res.json(err);
            });
        }
      });
    }
  });
};

//---------------
//---------------
module.exports.deliveryrejectOrder = (req, res) => {
  console.log(req.params.id);
  // Homechef.findOne({_id:req.params.id}).then(rejectchef=>{
  //   if(rejectchef.tempToken=="accepted")res.json({status:false,error:"You have accepted the order"}).status(400)
  // })
  Order.Order.findOne({ _id: req.params.orderid }).then((order) => {
    if (order.serviceboyid == req.params.id)
      res
        .json({ status: false, error: "You have accepted the order" })
        .status(400);
    else {
      Delivery.findOneAndUpdate(
        { _id: req.params.id },
        { tempToken: `rejected${req.params.orderid}` }
      )
        .then((result) => {
          {
            serviceboy.shift();
            if (serviceboy.length > 0) {
              let boyId = serviceboy[0];
              console.log(boyId);
              Delivery.findOne({ _id: boyId })
                .then((boy) => {
                  boy.tempToken = jwt.sign(
                    { _id: boyId, email: boy.email },
                    "token",
                    {
                      expiresIn: "10m",
                    }
                  );

                  let sendmail = boy.email;
                  let AcceptLink =
                    "http://localhost:5000/order/acceptdelivery/" +
                    boy._id +
                    "/" +
                    boy.tempToken +
                    "/" +
                    req.params.orderid;
                  console.log(req.params.orderid);
                  let RejectLink =
                    "http://localhost:5000/order/rejectdelivery/" +
                    boy._id +
                    "/" +
                    req.params.orderid;
                  var email = {
                    from: process.env.EMAILFROM,
                    to: sendmail,
                    subject: "Delivery Order Notification",
                    text: "Accept or reject the incoming order",
                    html:
                      // "<h1></h1>Link valid for 1 hour.Click to verify our email. <a href='http://localhost:5000/users/verifiedCustomer/${result.tempToken}'> here</a>",
                      '<h5>Link to accept order <a href="' +
                      AcceptLink +
                      '"> Accept </a></h5><br><h5>Link to reject order  <a href="' +
                      RejectLink +
                      '"> Reject </a></h5><br>',
                  };
                  client.sendMail(email, (err, info) => {
                    if (err) res.json(err);
                    else {
                      res.json(info);
                      // setTimeout(() => {
                      //   console.log("intimeout");
                      //   res.redirect(`http://localhost:5000/order/reject/${chef._id}`);
                      // }, 300000);
                    }
                  });
                })
                .catch((err) => {
                  res.json(err);
                });
            } else {
              console.log("no delivery");
              Homechef.findOne({ _id: order.homechefid })
                .then((chef) => {
                  var sendmail = chef.email;
                  let statusLink =
                    "http://localhost:5000/homechef/orderstatus/rejected" +
                    "/" +
                    order.orderid;
                  var email = {
                    from: process.env.EMAILFROM,
                    to: sendmail,
                    subject: "NO delivery boy available Notification",
                    text: "",
                    html:
                      "<h2>Mark the order Status as rejected</h2>" +
                      "<h3><a href=" +
                      statusLink +
                      '"> Reject </a></h3><br>',
                  };
                  client.sendMail(email, (err, info) => {
                    if (err) console.log(err);
                    else {
                      console.log(info);
                    }
                  });
                  res.json({ status: true, data: "Delivery boy assigned" });
                })
                .catch((err) => {
                  err;
                });

              res.json("no delivery").status(404);
            }
          }
        })
        .catch((err) => {
          res.json(err);
        });
    }
  });
};
