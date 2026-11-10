const projectModel = require("../models/project-model");
const taskModel = require("../models/task-model");

module.exports.createTaskService = async (req) => {
  const { title, description, project, assignedTo, priority, status, dueDate } =
    req.body;

  // Check whether project exists
  const existingProject = await projectModel.findById(project);

  if (!existingProject) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  // Check whether assigned user belongs to project
  if (
    assignedTo &&
    !existingProject.members.some((member) => member.toString() === assignedTo)
  ) {
    const error = new Error("Assigned user is not a project member");
    error.statusCode = 400;
    throw error;
  }

  let createdTask = taskModel.create({
    title,
    description,
    project,
    assignedTo,
    priority,
    status,
    dueDate,
    createdBy: req.user._id,
  });

  // Check whether assigned user belongs to project

  if (!createdTask) {
    const error = new Error("Error while creating project");
    error.statusCode = 401;
    throw error;
  }

  return createdTask;
};

module.exports.editTaskService = async (req) => {
  const { id } = req.params;
  const { title, description, assignedTo, priority, status, dueDate } =
    req.body;

  const task = await taskModel.findById(id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (assignedTo !== undefined) task.assignedTo = assignedTo;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (priority !== undefined) task.priority = priority;
  if (status !== undefined) task.status = status;

  await task.save();

  return task;
};

module.exports.getTaskService = async (req) => {
  const id = req.params.id;

  const task = await taskModel.findById(id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

module.exports.getAllTasksService = async (req) => {
  const tasks = await taskModel.find();

  if (!tasks) {
    const error = new Error("Tasks not found");
    error.statusCode = 404;
    throw error;
  }

  return tasks;
};
