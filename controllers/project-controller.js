const {
  createProjectService,
  getProjectService,
  getAllProjectService,
  editProjectService,
} = require("../services/project-service");

module.exports.createProject = async (req, res) => {
  try {
    let createdProject = await createProjectService(req);

    res
      .status(201)
      .json({ msg: "Project created", projectDetails: createdProject });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports.projects = async (req, res) => {
  try {
    let projects = await getAllProjectService(req);
    res.json({ projects });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports.getProject = async (req, res) => {
  try {
    let project = await getProjectService(req);
    res.json({ project });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports.editProject = async (req, res) => {
  try {
    let editedProject = await editProjectService(req);

    res
      .status(201)
      .json({ msg: "Project created", projectDetails: editedProject });
  } catch (e) {
    res.send(e.message);
  }
};
