const express = require("express");
const {
  register,
  login,
  logout,
  myprofile,
} = require("../controllers/auth-controller");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Inside auth" });
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/my-profile", isLoggedIn, myprofile);

module.exports = router;
