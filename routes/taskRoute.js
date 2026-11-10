const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");
const {
  tasks,
  getTask,
  createTask,
  editTask,
  getComment,
  addComment,
} = require("../controllers/task-controller");
const { validate } = require("../middleware/validate");

const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validators/task.validator");

router.get("/", tasks);
router.get("/:id", getTask);
router.post("/create-task", isLoggedIn, validate(createTaskSchema), createTask);
router.patch("/:id", isLoggedIn, validate(updateTaskSchema), editTask);

//comments
router.get("/:id/comment", isLoggedIn, getComment);
router.post("/:id/add-comment", isLoggedIn, addComment);

module.exports = router;
