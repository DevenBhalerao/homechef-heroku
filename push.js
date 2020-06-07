const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BJzRTAU0aLyc63-rdL7phwgV7KvaZGvx7CSaAp84hRfNAjx7PBZOjXIBDdENGIfNT5NfJ2X_ksBF6ugxli749vo";
const privateVapidKey = "hXwCEb8O4XXvq6jqJ0YMbEybu2pUHDOuwKou9JlEtxg";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Homechef" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
