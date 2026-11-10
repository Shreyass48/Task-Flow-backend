const {
  createTaskService,
  getAllTasksService,
  getTaskService,
  editTaskService,
} = require("../services/task-service");

module.exports.createTask = async (req, res) => {
  try {
    let createdTask = await createTaskService(req);

    res.status(201).json({ msg: "Task created", taskDetails: createdTask });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports.tasks = async (req, res) => {
  try {
    let tasks = await getAllTasksService(req);
    res.json({ tasks });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports.getTask = async (req, res) => {
  try {
    let task = await getTaskService(req);
    res.json({ task });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports.editTask = async (req, res) => {
  try {
    let editedTask = await editTaskService(req);

    res.status(201).json({ msg: "Task Edited", taskDetails: editedTask });
  } catch (e) {
    res.send(e.message);
  }
};
