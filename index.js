const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const users = require("./apis/routes/users");
const homechef = require("./apis/routes/homechef");
const menu = require("./apis/routes/menu");
const order = require("./apis/routes/order");
const delivery = require("./apis/routes/delivery");
const admin = require("./apis/routes/admin");

//connection
const url = process.env.URL;
mongoose.connect(process.env.MONGODB_URI || url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB Connected");
});
mongoose.Promise = global.Promise;
//ports
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/users", users);
app.use("/homechef", homechef);
app.use("/menu", menu);
app.use("/order", order);
app.use("/delivery", delivery);
app.use("/admin", admin);

//
if (process.env.NODE_ENV === "production") {
  app.use(express.static("front-end/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front-end/build", "index.html"));
  });
}
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
