const router = require("express").Router();

const auth = require("../authtoken");

//
//profile details for the chef
const chef = require("../controllers/homechefcontroller");
//--
router.route("/profile").get(auth, chef.getProfileDetails);

//
//
//change status of the chef:??
router.route("/status/:val").post(auth, chef.changeAvailabilityStatus);

//
//
//update address of a homechef for the id
router.route("/update/address").post(auth, chef.updateaddress);
//
//update lat,long
router.route("/updatelatlong").post(auth, chef.updatelatlong);
//show the details of the homechef for the id
router.route("/menu").get(auth, chef.getMenuDetails);

//
//
//add items to the menu update if menu is not static
//
router.route("/menu/additems").put(auth, chef.addItemsOneByOne);

//remove homechef user
router.route("/delete").delete(auth, chef.deleteuser);
router.route("/addmenu").put(auth, chef.addMenu);

router.route("/orders").get(auth, chef.getAllOrders);

//see past orders
router.route("/orders/past").get(auth, chef.getPastOrders);

//see active orders
router.route("/orders/active").get(auth, chef.getActiveOrders);

//
router.route("/order/:id").get(auth, chef.getOrderById);

//change order status as per order id
router.route("/orderstatus/:status/:orderid").get(auth, chef.changeOrderStatus);

module.exports = router;
