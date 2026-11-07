const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Inside auth" });
});

router.post("/register", (req, res) => {
  res.json({ msg: "Inside auth" });
});

router.post("/login", (req, res) => {
  res.json({ msg: "Inside auth" });
});

router.post("/my-profile", (req, res) => {
  res.json({ msg: "Inside auth" });
});

module.exports = router;
