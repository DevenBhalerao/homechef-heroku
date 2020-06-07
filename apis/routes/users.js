const router = require("express").Router();

let jwt = require("jsonwebtoken");

const auth = require("../authtoken");
//-------------//-----
//----------
const user = require("../controllers/usercontroller");

//
//show details for the user with the id
router.route("/profile").get(auth, user.getProfileDetails);

//registration both user and homechef and send email token
router.route("/register").post(user.register);
//verify customer token

router.route("/verifiedCustomer/:token").get(user.verifyCustomer);

//verify Homechef token
router.route("/verifiedHomechef/:token").get(user.verifyHomechef);
//
router.route("/verifiedDelivery/:token").get(user.verifyServiceBoy);

//login

router.route("/login").post(user.login);

//update address for a user with id
router.route("/update/address").put(auth, user.updateaddress);

//update lat,long
router.route("/updatelatlong").post(auth, user.updatelatlong);
//remove user
router.route("/delete").delete(auth, user.deleteuser);

//@ orders section

//see all orders
router.route("/orders").get(auth, user.getAllOrders);

//see the order by their order id

router.route("/order/:id").get(auth, user.getOrderById);
module.exports = router;
