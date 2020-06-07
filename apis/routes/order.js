const router = require("express").Router();

let auth = require("../authtoken");
let jwt = require("jsonwebtoken");

////////////////////////
///////////////////////
const order = require("../controllers/ordercontroller");

//remove order
router.route("/delete/:id").delete((req, res) => {
  Order.Order.findOneAndDelete({ orderid: req.params.id }, (err, result) => {
    if (err) res.json(err);
    else {
      res.json("Order deleted");
    }
  });
});

//add order
router.route("/add").post(auth, order.createOrder);

//accept order
router.route("/accept/:id/:token/:orderid").get(order.acceptOrder);
//reject oder send to next chef
router.route("/reject/:id/:orderid").get(order.rejectOrder);
//

//accept order
router
  .route("/acceptdelivery/:id/:token/:orderid")
  .get(order.deliveryacceptorder);
//reject oder send to next chef
router.route("/rejectdelivery/:id/:orderid").get(order.deliveryrejectOrder);
//----------------------------------------------------------------------------------------------------------------------------
router.route("/sendsms/:id").post((req, res) => {
  data = req.body;
  Delivery.findOneAndUpdate(
    { _id: req.params.id },
    {
      tempToken: jwt.sign({ _id: req.params.id }, "token", {
        expiresIn: "12000ms",
      }),
    }
  )
    .then((result) => {
      let number = result.phone;
      console.log(number);

      let AcceptLink =
        "http://localhost:5000/order/acceptDelivery/" + result.id;
      let RejectLink = "http://localhost:5000/order/rejectDelivery";
      let text = "incoming delivery order to accept click link:";
      text += "http://localhost:5000/order/acceptDelivery/";

      $sms = "You can now track your order here: ";
      $sms += "http://www.yes.com/order/acceptDelivery/";

      clientSMS.messages
        .create({
          body: $sms,
          from: "+14692622122",
          to: "+91" + number,
        })
        .then((message) => res.json(message.sid))
        .catch((err) => res.json(err));

      // let AcceptLink =
      //               "http://localhost:5000/order/acceptDelivery/" +
      //               result.id +
      //               "/" +
      //               result.tempToken;
      //       let RejectLink = "http://localhost:5000/order/rejectDelivery";

      //       let text="incoming delivery order to accept click link<a href='"+AcceptLink+"'> here</a>To reject <a href='"+RejectLink+"'></a>";
      //       // console.log(text);
      //       nexmo.message.sendSms("+919130297838", "+91"+number, 'text', {
      //         type: "unicode"
      //       }, (err, responseData) => {
      //         if (err) {
      //           console.log("err");
      //         } else {
      //           if (responseData.messages[0]['status'] === "0") {
      //             console.log("Message sent successfully.");
      //             console.log(responseData);

      //           } else {
      //             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
      //           }
      //         }
      //       });
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.route('/acceptDelivery/:id').post((req,res)=>{
//     Delivery.findOne({ _id: req.params.id })
//     .then((result) => {
//       var token = req.params.token;
//       jwt.verify(token, "token", (err, decoded) => {
//         if (err) {
//           console.log(err);
//         } else {
//           result.tempToken = "false";
//           Delivery.findOneAndUpdate(
//             { _id: req.params.id },
//             { $push: { orders: "7412852963" } },
//             (err, output) => {
//               if (err) res.json(err);
//             else{
//               res.json(output);
//             }
//             });
//         }
//     });
//   });
// });

// router.route('/rejectDelivery/:id').post((req,res)=>{
//  res.json("rejected");
// });

module.exports = router;
