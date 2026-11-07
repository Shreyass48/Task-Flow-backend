const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "app is up and running" });
});

module.exports = router;
