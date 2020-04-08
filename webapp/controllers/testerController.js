const mongoose = require('mongoose');
const Tester = require('./../models/testerModel');
const Project = require('./../models/projectModel');

const testerController = {};

testerController.createTester = async (req, res) => {
  try {
    const tester = await Tester.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tester,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      messsage: err,
    });
  }
};
testerController.getTester = async (req, res) => {
  try {
    const tester = await Tester.find({ firebaseId: req.params.testerid });
    res.status(200).json({
      status: 'success',
      data: {
        tester,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      messsage: err,
    });
  }
};
testerController.updateTester = async (req, res) => {
  try {
    const tester = await Tester.findByIdAndUpdate(
      req.params.testerid,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        tester,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};
testerController.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ testers: req.params.testerid });
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

module.exports = testerController;
