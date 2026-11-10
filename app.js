const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/authRoute");
const projectRoute = require("./routes/projectRoute");
const taskRoute = require("./routes/taskRoute");
const db = require("./config/mongo-connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRoute);
app.use("/api/tasks", taskRoute);

app.listen(3000);
