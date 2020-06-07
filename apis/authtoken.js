const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(506).json({status: false, error: "Login First!!"});
  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
};
