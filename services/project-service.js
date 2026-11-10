const projectModel = require("../models/project-model");

module.exports.createProjectService = async (req) => {
  const { name, description } = req.body;
  let createdProject = projectModel.create({
    name,
    description,
    owner: req.user._id,
  });

  if (!createdProject) {
    const error = new Error("Error while creating project");
    error.statusCode = 401;
    throw error;
  }

  return createdProject;
};
module.exports.editProjectService = async (req) => {
  const { id } = req.params;
  const { name, description, status, members } = req.body;

  const project = await projectModel.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  // Only project owner can update
  if (project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("You are not authorized to update this project");
    error.statusCode = 403;
    throw error;
  }

  if (name !== undefined) project.name = name;
  if (description !== undefined) project.description = description;
  if (status !== undefined) project.status = status;
  if (members.length !== 0) project.members = members;

  await project.save();

  return project;
};

module.exports.getProjectService = async (req) => {
  const id = req.params.id;

  const project = await projectModel.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};

module.exports.getAllProjectService = async (req) => {
  const projects = await projectModel.find();

  if (!projects) {
    const error = new Error("Projects not found");
    error.statusCode = 404;
    throw error;
  }

  return projects;
};
