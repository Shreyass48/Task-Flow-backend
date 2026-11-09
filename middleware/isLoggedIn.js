const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    res.status(501).json({ msg: "Please login to continue" });
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    req.user = user;
    next();
  } catch (e) {
    res.send(e.message);
  }
};
