const router = require("express").Router();
const Menu = require("../../models/menu.model");
const Homechef = require("../../models/homechef.model");
const auth = require("../authtoken");
// router.route("/menu/:id").get((req, res) => {
//   Homechef.findOne({ username: req.params.id })
//     .populate("menucooked")
//     .then((menu) => res.json(menu))
//     .catch((err) => res.status(400).json("ERROR>>>>" + err));
// });
// router.route("/add").post((req,res)=>{
//   Menu.create(req.body)
//   .then((result) => {
//     res.json(result);
//   })
//   .catch((err) => {
//     res.json(err);
//   });
// });

//find on catogary
router.route("/:cat").get((req, res) => {
  Menu.aggregate([
    { $unwind: "$products" },
    { $match: { "products.catogaryName": req.params.cat } },
  ])
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//find on sub catogary of that catogary
router.route("/:cat/:subcatogary").get((req, res) => {
  Menu.aggregate([
    { $unwind: "$products" },
    {
      $match: {
        "products.subcatogaryName": req.params.subcatogary,
        "products.catogaryName": req.params.cat,
      },
    },
  ])
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
