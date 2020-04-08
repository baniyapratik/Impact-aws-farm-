const Manager = require('./../models/managerModel');
const Project = require('./../models/projectModel');

const managerController = {};

managerController.createManager = async (req, res) => {
  try {
    const manager = await Manager.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        manager,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      messsage: err,
    });
  }
};

managerController.getManager = async (req, res) => {
  try {
    const manager = await Manager.find({ firebaseId: req.params.managerid });
    res.status(200).json({
      status: 'success',
      data: {
        manager,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      messsage: err,
    });
  }
};

managerController.updateManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndUpdate(
      req.params.managerid,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        manager,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};
managerController.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.params.managerid });
    res.status(200).json({
      status: 'success',
      length: projects.length,
      data: {
        projects,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

module.exports = managerController;
