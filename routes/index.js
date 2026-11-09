const express = require("express");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "app is up and running" });
});

router.get("/task", isLoggedIn, (req, res) => {
  res.json({ msg: "app is up and running" });
});

module.exports = router;
