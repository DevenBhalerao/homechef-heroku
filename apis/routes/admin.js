const router = require("express").Router();
const Menu = require("../../models/menu.model");
//--------
const admin = require("../controllers/admincontroller");
//---------------
router.route("/menu").post(admin.createMenu);
//find all menus
router.route("/findall").get(admin.getAllMenuDetails);

//add products
router.route("/addProduct").put(admin.addItemsToMenu);

module.exports = router;
