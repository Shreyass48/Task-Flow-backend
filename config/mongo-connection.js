const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.MONGODB_URL}/task-flow`)
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((e) => {
    console.log(e.message);
  });

module.exports = mongoose.connect;
