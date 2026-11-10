const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { tasks, getTask, createTask, editTask } = require("../controllers/task-controller");

router.get("/", tasks);
router.get("/:id", getTask);
router.post("/create-task", isLoggedIn, createTask);
router.patch("/:id", isLoggedIn, editTask);

module.exports = router;
