const express = require("express");
const app = express();
require("dotenv").config();

const indexRouter = require("./routes/index");
const db = require("./config/mongo-connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);

app.listen(3000);
