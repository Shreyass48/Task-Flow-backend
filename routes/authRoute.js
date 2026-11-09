const express = require("express");
const { register, login, logout } = require("../controllers/auth-controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Inside auth" });
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/my-profile", (req, res) => {
  res.json({ msg: "Inside auth" });
});

module.exports = router;
