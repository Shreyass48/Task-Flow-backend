const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/authRoute");
const db = require("./config/mongo-connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api/auth", authRouter);

app.listen(3000);
