const router = require("express").Router();

let jwt = require("jsonwebtoken");

const auth = require("../authtoken");
//
const delivery = require("../controllers/deliverycontroller");

//login
router.route("/login").post(delivery.login);

//profile details for the boy

router.route("/profile").get(auth, delivery.getProfileDetails);

//update lat,long
router.route("/updatelatlong").post(auth, delivery.updatelatlong);
//@order section

//see all orders
router.route("/orders").get(auth, delivery.getAllOrders);
//change status of the boy:??
router.route("/status/:val").post(auth, delivery.changeAvailabilityStatus);
//see past orders
router.route("/orders/past").get(auth, delivery.getPastOrders);

//see active orders
router.route("/orders/active").get(auth, delivery.getActiveOrders);
//see the order by their order id all details

router.route("/order/:id").get(auth, delivery.getOrderById);

//change order status as per order id
router
  .route("/orderstatus/:status/:orderid")
  .post(auth, delivery.changeOrderStatus);
//status

module.exports = router;
