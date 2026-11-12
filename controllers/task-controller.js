const {
  createTaskService,
  getAllTasksService,
  getTaskService,
  editTaskService,
  addCommentService,
  getCommentService,
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
    const size = parseInt(req.query.size) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * size;
    
    let tasks = await getAllTasksService(req, size, skip);
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

module.exports.getComment = async (req, res) => {
  try {
    let comment = await getCommentService(req);
    res.json({ comment });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports.addComment = async (req, res) => {
  try {
    let comment = await addCommentService(req);
    res.json({ comment });
  } catch (e) {
    res.send(e.message);
  }
};
