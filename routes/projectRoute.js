const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");
const {
  createProject,
  projects,
  getProject,
  editProject,
} = require("../controllers/project-controller");

router.get("/", projects);
router.get("/:id", getProject);
router.post("/create-project", isLoggedIn, createProject);
router.patch("/:id", isLoggedIn, editProject);

module.exports = router;
