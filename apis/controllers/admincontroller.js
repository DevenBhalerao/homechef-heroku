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

module.exports.createMenu = (req, res) => {
  Menu.create(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err).status(400);
    });
};
//-------
//--------
module.exports.getAllMenuDetails = (req, res) => {
  Menu.find()
    .then((menu) => {
      res.json(menu);
    })
    .catch((err) => res.status(400).json(err));
};
//-----------
//---------
module.exports.addItemsToMenu = (req, res) => {
  Menu.update({}, { $push: { products: req.body } }, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
